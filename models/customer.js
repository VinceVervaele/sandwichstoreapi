const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 125
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 125
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 250
  },
  isAdmin: Boolean
});

customerSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.jwtPrivateKey);
  return token;
}

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(125).required(),
    phone: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(6).max(125).required().email(),
    password: Joi.string().min(8).max(250).required()
  });

  return schema.validate(customer);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;