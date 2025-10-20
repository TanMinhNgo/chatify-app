# Chatify - Real-time Messaging Application

A modern, full-stack real-time messaging application built with React, Node.js, Express, MongoDB, and Socket.IO.

![Chatify](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 🚀 Features

- **Real-time Messaging** - Instant message delivery using Socket.IO
- **User Authentication** - Secure signup/login with JWT tokens
- **Profile Management** - Upload and update profile pictures
- **Online Status** - See who's online in real-time
- **Message History** - View past conversations
- **Image Sharing** - Send images in chats
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Sound Notifications** - Optional keyboard sounds and message alerts
- **Email Notifications** - Welcome emails via Resend
- **Security Features** - Rate limiting, bot detection, and attack protection with Arcjet

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Resend** - Email service
- **Arcjet** - Security and rate limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Resend account
- Arcjet account (optional, for security features)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/TanMinhNgo/chatify-app.git
cd chatify-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Backend Environment Variables**

Create a `.env` file in the `backend` directory:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Chatify
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

4. **Setup Frontend Environment Variables**

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8080
```

5. **Run the application**

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## 📁 Project Structure

```
chatify-app/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   └── env.js
│   │   ├── controllers/      # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/           # Email templates and handlers
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplates.js
│   │   ├── lib/              # Utility libraries
│   │   │   ├── arcjet.js
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── resend.js
│   │   │   ├── socket.js
│   │   │   └── utils.js
│   │   ├── middleware/       # Express middleware
│   │   │   ├── arcjet.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   └── socket.auth.middleware.js
│   │   ├── models/           # Mongoose models
│   │   │   ├── Message.js
│   │   │   └── User.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js         # Entry point
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── sounds/           # Audio files
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utility libraries
│   │   │   └── axios.js
│   │   ├── pages/            # Page components
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── store/            # Zustand stores
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── package.json
```

## 🔑 Key Components

### Authentication
- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Protected routes with middleware
- Welcome email on signup

### Real-time Communication
- Socket.IO for WebSocket connections
- Online/offline status tracking
- Real-time message delivery
- Socket authentication middleware

### State Management
- `useAuthStore` - Authentication state
- `useChatStore` - Chat and messaging state

### Security
- Arcjet for rate limiting and bot detection
- JWT token validation
- CORS configuration
- Input validation

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/update-profile` - Update user profile
- `GET /api/auth/check` - Check authentication status

### Messages
- `GET /api/messages/contacts` - Get all contacts
- `GET /api/messages/chats` - Get chat partners
- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to user

## 🎨 UI Components

- `BorderAnimatedContainer` - Animated gradient border
- `ChatContainer` - Main chat interface
- `ChatHeader` - Chat header with user info
- `ChatsList` - List of active chats
- `ContactsList` - List of all contacts
- `MessageInput` - Message input with image upload
- `ProfileHeader` - User profile section
- `ActiveTabSwitch` - Tab switching between chats and contacts
- `PageLoader` - Loading spinner
- `MessagesLoadingSkeleton` - Loading state for messages
- `UsersLoadingSkeleton` - Loading state for users

## 🔊 Sound Features

- Keyboard typing sounds (optional)
- Message notification sounds (optional)
- Mouse click sounds
- Configurable in user settings

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This will:
1. Install backend dependencies
2. Install frontend dependencies
3. Build the frontend for production

### Start Production Server

```bash
npm start
```

The server will serve the built frontend from the backend.

### Environment Variables for Production

Update the following in your production environment:
- `NODE_ENV=production`
- `CLIENT_URL=https://yourdomain.com`
- Update all API keys and secrets

## 📝 Getting Started Guide

### Step 1: Install MongoDB
```bash
# Download and install MongoDB Community Edition
# Or use MongoDB Atlas for cloud hosting
```

### Step 2: Setup Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your `.env` file

### Step 3: Setup Resend
1. Sign up at [Resend](https://resend.com/)
2. Get your API Key
3. Add it to your `.env` file

### Step 4: Run the Application
```bash
npm run dev
```

### Step 5: Test the Application
1. Open `http://localhost:5173`
2. Sign up with a new account
3. Try sending messages
4. Upload a profile picture
5. Test real-time features with multiple browser tabs

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network access if using MongoDB Atlas

### Socket.IO Connection Issues
- Check CORS configuration
- Verify `CLIENT_URL` in backend `.env`
- Ensure both frontend and backend are running

### Image Upload Issues
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper content type

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**TanMinhNgo**

- GitHub: [@TanMinhNgo](https://github.com/TanMinhNgo)

## 🙏 Acknowledgments

- Socket.IO for real-time functionality
- Cloudinary for image hosting
- Resend for email services
- Arcjet for security features
- DaisyUI for beautiful UI components
- Tailwind CSS for styling utilities

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by TanMinhNgo
