const bcrypt = require('bcrypt');
const User = require('../models/User');

// @desc    Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Username or email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const user = await newUser.save();

    res.status(201).json({ message: "User registered successfully!", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration.", error: err });
  }
};

// @desc    Login a user
exports.loginUser = (req, res) => {
  // Passport middleware handles the logic. If we reach here, login is successful.
  res.status(200).json(req.user);
};

// @desc    Logout a user
exports.logoutUser = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// @desc    Get current user auth status
exports.getAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};