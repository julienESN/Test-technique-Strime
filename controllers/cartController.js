const Joi = require('joi');
const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');
const OrderModel = require('../models/orderModel');
exports.createCart = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await CartModel.createCart(req.body.userId);
    res.status(201).send('Cart created');
  } catch (err) {
    console.error(err);
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
  const schema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
  const schema = Joi.object({
    quantity: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await CartModel.updateQuantity(
      req.params.id,
      req.params.productId,
      req.body.quantity
    );
    res.status(200).send('Product quantity updated');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

exports.checkout = async (req, res) => {
  try {
    // 1. Vérifier si le panier est valide
    const cart = await CartModel.getCart(req.params.id);

    if (!cart) {
      return res.status(400).send('Cart does not exist');
    }
    if (!cart.items || cart.items.length === 0) {
      return res.status(400).send('Cart is empty or malformed');
    }

    // 2. Récupérer les produits du panier
    const productIds = cart.items.map((item) => item.product_id);
    const products = await ProductModel.getProducts(productIds);

    // 3. Calculer le total_amount et créer un tableau de détails de produits
    let productDetails = [];
    const totalAmount = products.reduce((total, product) => {
      const cartItem = cart.items.find(
        (item) => item.product_id === product.id
      );
      // Ajouter les détails de chaque produit à productDetails
      productDetails.push({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        quantity: cartItem.quantity,
        total_price: product.price * cartItem.quantity,
      });
      return total + product.price * cartItem.quantity;
    }, 0);

    // 4. Créer une nouvelle commande à partir des informations du panier
    const order = await OrderModel.createOrder(cart.user_id, totalAmount);
    console.log(order);

    // 5. Vider le panier

    // 6. Récupérer les détails de la commande à partir de son ID
    const orderDetails = await OrderModel.getOrder(order.id);

    // 7. Ajouter les détails du produit à orderDetails
    orderDetails['products'] = productDetails;

    // 8. Renvoyer les détails de la commande au client
    res.status(200).json(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
