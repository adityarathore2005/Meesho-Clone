const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, sellerMode } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Open routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Seller protected route
router.post('/', protect, sellerMode, upload.single('image'), productController.createProduct);

module.exports = router;
