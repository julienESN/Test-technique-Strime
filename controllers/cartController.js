const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');
exports.createCart = async (req, res) => {
  try {
    await CartModel.createCart(req.body.userId);
    res.status(201).send('Cart created');
  } catch (err) {
    console.error(err); // Ajoute cette ligne pour afficher l'erreur dans la console
    res.status(500).send(err.message);
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await CartModel.getCart(req.params.id);
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
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
    console.error(err); 
    res.status(500).send(err.message);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await CartModel.removeProduct(req.params.id, req.params.productId);
    res.status(200).send('Product removed from cart');
  } catch (err) {
    console.error(err); 
    res.status(500).send(err.message);
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
    console.error(err); // Ajoute cette ligne pour afficher l'erreur dans la console
    res.status(500).send(err.message);
  }
};

exports.checkout = async (req, res) => {
  try {
    await CartModel.checkout(req.params.id);
    res.status(200).send('Checkout successful');
  } catch (err) {
    console.error(err); // Ajoute cette ligne pour afficher l'erreur dans la console
    res.status(500).send(err.message);
  }
};
