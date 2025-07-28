const router = require('express').Router();
const multer = require('multer');
const picController = require('../controllers/picController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // We need to create this file

// Multer setup for in-memory storage (to forward to ImgBB)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get('/', picController.getAllPics);
router.post('/upload', isAuthenticated, upload.single('image'), picController.uploadPic);

module.exports = router;