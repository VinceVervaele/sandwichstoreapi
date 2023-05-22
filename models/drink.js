const Joi = require('joi');
const mongoose = require('mongoose');

const Drink = mongoose.model('Drink', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 10
  },
  amountInStock: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10
  }
}));

function validateDrink(drink) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).max(100).required(),
    amountInStock: Joi.number().min(1).max(255).required()
  });

  return schema.validate(drink);
}

exports.Drink = Drink; 
exports.validate = validateDrink