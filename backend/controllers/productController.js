const Product = require('../models/Product');

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find({}).populate('user', 'name email');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('user', 'name email');
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { title, description, price, category } = req.body;
      
      let imageUrl = '';
      if (req.file && req.file.path) {
        imageUrl = req.file.path; // Cloudinary assigns the URL to path
      } else {
        return res.status(400).json({ message: 'No image uploaded' });
      }

      const product = new Product({
        user: req.user._id,
        title,
        description,
        price,
        category,
        imageUrl,
      });

      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productController;
