import { ENV } from "../config/env.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

const authController = {
    signup: async (req, res) => {
      const { fullName, email, password } = req.body;

      try {
        if(!fullName || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        if(password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: 'Invalid email format' });
        }

        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, email, password: hashedPassword });
        if(newUser.isNew) {
            const savedUser = await newUser.save();
            generateToken(newUser._id, res);

            res.status(201).json({ message: 'User registered successfully', data: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            } });

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Error sending welcome email after signup:", error);
            }
        } else {
            return res.status(500).json({ message: 'Error creating user' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
      }
    },
    
    login: async (req, res) => {
      const { email, password } = req.body;

      try {
        if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        generateToken(user._id, res);

        res.json({ message: 'User logged in successfully', data: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
      }
    },

    logout: (_, res) => {
      res.clearCookie('jwt', { maxAge: 0 });
      res.status(200).json({ message: 'User logged out successfully' });
    },

    updateProfile: async (req, res) => {
        try {
            const { profilePic } = req.body;
            if (!profilePic) {
                return res.status(400).json({ message: 'Profile picture is required' });
            }

            const userId = req.user._id;

            const uploadResponse = await cloudinary.uploader.upload(profilePic);

            const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

            res.status(200).json({ message: 'Profile updated successfully', data: { profilePic: updatedUser.profilePic } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating profile' });
        }
    }
};

export { authController };