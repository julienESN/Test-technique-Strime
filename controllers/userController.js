const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const UserModel = require('../models/userModel');

exports.register = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  try {
    await UserModel.createUser(username, password);
    res.status(201).send('User registered');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  try {
    const user = await UserModel.getUserByUsername(username);
    if (!user || !(await UserModel.verifyPassword(user.id, password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
