require('dotenv').config(); //FOR ENVIRONMENT VARIABLES

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const Dept = require('./models/DeptModel');
const UserDeptModel = require('./models/UserDeptModel');

const app = express();
const PORT = process.env.PORT || 3001;
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
app.use('/userdept', require('./routes/userDeptRoute'));
app.use('/', require('./routes/globalRoute'));

// For debugging purposes only
app.get('/debugUsers', async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
app.get('/debugDepts', async (req, res) => {
  try {
    const userData = await Dept.find();
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
app.get('/debug', async (req, res) => {
  try {
    const userData = await UserDeptModel.find();
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
