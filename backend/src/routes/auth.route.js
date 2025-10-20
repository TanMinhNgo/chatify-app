import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();

// router.use(arcjetProtection);

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.post('/logout', authController.logout);

router.post('/update-profile', protectRoute, authController.updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;