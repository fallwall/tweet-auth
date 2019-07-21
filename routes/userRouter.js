const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { genToken, restrict } = require('../auth');


const users = Router();

const SALT = 19;

users.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const password_digest = await bcrypt.hash(password, 2);
    const newUser = {
      name,
      email,
      password_digest,
    };
    const user = await User.create(newUser);
    const userData = {
      name: user.name,
      email: user.email,
    };
    const token = genToken({ userData });
    res.json({ user: userData, token });
    
  } catch (e) {
    res.status(500).send(e.message);
  }
});

users.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });
    const isValidPass = await bcrypt.compare(password, user.password_digest);
    if (isValidPass) {
      const { password_digest, ...userData } = user.dataValues;
      const token = genToken(userData);
      res.json({ token, user: userData });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (e) {
    console.log(e.message);
    res.status(401).send('Invalid credentials');
  }
});

users.get('/verify', restrict, (req, res) => {
  res.json({user: res.locals.user });
});

module.exports = users;