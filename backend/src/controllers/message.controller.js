import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const messageController = {
  getAllContacts: async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      if (!loggedInUserId) {
        return res.status(400).json({ message: "Invalid user ID." });
      }

      const filteredUsers = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
      if (filteredUsers.length === 0 || !filteredUsers) {
        return res.status(404).json({ message: "No contacts found." });
      }

      res.status(200).json({ data: filteredUsers });
    } catch (error) {
      console.log("Error in getAllContacts:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getMessagesByUserId: async (req, res) => {
    try {
      const myId = req.user._id;
      const { id: userToChatId } = req.params;

      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });

      res.status(200).json({ data: messages });
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      if (!text && !image) {
        return res.status(400).json({ message: "Text or image is required." });
      }
      if (senderId.equals(receiverId)) {
        return res
          .status(400)
          .json({ message: "Cannot send messages to yourself." });
      }
      const receiverExists = await User.exists({ _id: receiverId });
      if (!receiverExists) {
        return res.status(404).json({ message: "Receiver not found." });
      }

      let imageUrl;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json({ data: newMessage });
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  },

  getChatPartners: async (req, res) => {
    try {
      const loggedInUserId = req.user._id;

      if (!loggedInUserId) {
        return res.status(400).json({ message: "Invalid user ID." });
      }

      const messages = await Message.find({
        $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
      });

      if (messages.length === 0 || !messages) {
        return res.status(404).json({ message: "No messages found." });
      }

      const chatPartnerIds = [
        ...new Set(
          messages.map((msg) =>
            msg.senderId.toString() === loggedInUserId.toString()
              ? msg.receiverId.toString()
              : msg.senderId.toString()
          )
        ),
      ];

      const chatPartners = await User.find({
        _id: { $in: chatPartnerIds },
      }).select("-password");
      if (!chatPartners) {
        return res.status(404).json({ message: "No chat partners found." });
      }

      res.status(200).json({ data: chatPartners });
    } catch (error) {
      console.error("Error in getChatPartners: ", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export { messageController };
