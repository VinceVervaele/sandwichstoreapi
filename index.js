const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const customers = require('./routes/customer');
const sandwiches = require('./routes/sandwich');
const drinks = require('./routes/drink');
const orders = require('./routes/order');
const auth = require('./routes/auth');
require("dotenv").config();
const app = express();

mongoose.connect(process.env.connectionString)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.get("/" ,(req,res) => {
  res.send("Welkom op de broodjeszaak-api")
})
app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/sandwiches', sandwiches);
app.use('/api/drinks', drinks);
app.use('/api/orders', orders);
app.use('/api/auth', auth);

app.use((error, res) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: error.message || "Internal Server Error",
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;