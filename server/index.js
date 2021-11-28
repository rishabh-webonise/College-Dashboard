require('dotenv').config(); //FOR ENVIRONMENT VARIABLES

const path = require('path');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const Dept = require('./models/DeptModel');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || 'secret123#';
mongoose.connect(process.env.MONGOOSE_URI);

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
app.use('/students', require('./routes/userRoute'));
app.use('/departments', require('./routes/deptRoute'));
app.use('/', require('./routes/globalRoute'));

// For debugging purposes only
app.get('/debug', async (req, res) => {
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
