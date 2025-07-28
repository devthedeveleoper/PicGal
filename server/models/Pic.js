const mongoose = require('mongoose');

const PicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  display_url: {
    type: String,
    required: true,
  },
  delete_url: { // Important for managing your ImgBB uploads
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pic', PicSchema);