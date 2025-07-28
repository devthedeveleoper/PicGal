const axios = require('axios');
const FormData = require('form-data');
const Pic = require('../models/Pic');

// @desc    Get all pics
exports.getAllPics = async (req, res) => {
  try {
    const pics = await Pic.find().sort({ createdAt: -1 }).populate('user', 'username');
    res.status(200).json(pics);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching pics." });
  }
};

// @desc    Upload a new pic
exports.uploadPic = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided." });
  }

  try {
    // Prepare form data to send to ImgBB
    const formData = new FormData();
    formData.append('image', req.file.buffer.toString('base64'));
    
    // Make the POST request to ImgBB API
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData
    );

    if (!response.data.success) {
      throw new Error('Image upload to ImgBB failed.');
    }

    const imgbbData = response.data.data;

    // Create a new Pic document in our database
    const newPic = new Pic({
      title: req.body.title || 'Untitled',
      user: req.user.id, // From our authenticated session
      display_url: imgbbData.display_url,
      delete_url: imgbbData.delete_url,
    });

    const savedPic = await newPic.save();
    res.status(201).json(savedPic);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during image upload." });
  }
};