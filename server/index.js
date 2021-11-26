require('dotenv').config(); //FOR ENVIRONMENT VARIABLES

const path = require('path');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/UserModel');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || 'secret123#';
mongoose.connect('mongodb://localhost:27017/minidb');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const logger = (req, res, next) => {
  console.log(new Date().toTimeString());
  next();
};
app.use(logger);

// Routes
app.post('/register', async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      userType: req.body.userType,
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'An account with this email already exists!' });
  }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ status: 'error', error: 'Email not registered!' });
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        userType: user.userType,
        name: user.name,
        email: user.email,
      },
      SECRET_KEY
    );
    res.json({ status: 'ok', user: token });
  } else {
    res.json({ status: 'error', error: 'Wrong password!' });
  }
});

app.get('/dashboard', async (req, res) => {
  const token = req.headers['x-access-token'];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid token!' });
    }
    const userData = await User.find();
    res.json({ status: 'ok', users: userData });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'Invalid token' });
  }
});

// For debugging purposes only
app.get('/', async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));
