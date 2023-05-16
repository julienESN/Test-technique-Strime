const CartModel = require('../models/cartModel');

exports.createCart = async (req, res) => {
  try {
    await CartModel.createCart(req.body.userId);
    res.status(201).send('Cart created');
  } catch (err) {
    console.error(err); // Ajoute cette ligne pour afficher l'erreur dans la console
    res.status(500).send(err.message);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await ProductModel.getProduct(req.body.productId);
    if (!product) {
      return res.status(400).send('Product does not exist');
    }
    await CartModel.addProduct(
      req.params.id,
      req.body.productId,
      req.body.quantity
    );
    res.status(201).send('Product added to cart');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await CartModel.removeProduct(req.params.id, req.params.productId);
    res.status(200).send('Product removed from cart');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    await CartModel.updateQuantity(
      req.params.id,
      req.params.productId,
      req.body.quantity
    );
    res.status(200).send('Product quantity updated');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.checkout = async (req, res) => {
  try {
    await CartModel.checkout(req.params.id);
    res.status(200).send('Checkout successful');
  } catch (err) {
    res.status(500).send('Server error');
  }
};
