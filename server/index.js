const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5001;

// Passport Config
require('./config/passport')(passport);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow your React client's origin
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Set to false, session is created on login
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pics', require('./routes/pics')); 

// Connect to DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));