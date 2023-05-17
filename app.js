const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const cartRoutes = require('./routes/cart');
// const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
// const orderRoutes = require('./routes/order');

app.use('/cart', cartRoutes);
// app.use('/product', productRoutes);
app.use('/user', userRoutes);
// app.use('/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('Bonjour!');
});

app.listen(3000, () => {
  console.log("Application en cours d'exécution sur le port 3000");
});

module.exports = app;
