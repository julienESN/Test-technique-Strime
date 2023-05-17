const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.getUserByUsername(username);
  if (!user || !(await UserModel.verifyPassword(user.id, password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
};
