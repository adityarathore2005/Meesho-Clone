const Cart = require('../models/Cart');

const cartController = {
  getCart: async (req, res) => {
    try {
      let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      if (!cart) {
        // Create an empty cart if not exists
        cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addToCart: async (req, res) => {
    const { productId, quantity, price } = req.body;

    try {
      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
      }

      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        // Item exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ product: productId, quantity, price });
      }

      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

      await cart.save();
      
      cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    const { productId } = req.params;
    
    try {
      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
      
      await cart.save();

      cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = cartController;
