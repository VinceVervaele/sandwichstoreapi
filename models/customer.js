const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50
  }
}));

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(125).required(),
    phone: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(8).max(50).required(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;