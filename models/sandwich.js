const Joi = require('joi');
const mongoose = require('mongoose');

const Sandwich = mongoose.model('Sandwich', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 10
  },
  ingredients: {
    type: [String],
    required: true,
    minlength: 1,
    maxlength: 50
  }
}));

function validateSandwich(sandwich) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    price: Joi.number().min(0).max(100).required(),
    ingredients: Joi.array().items(Joi.string().min(1).max(50).required())
  });

  return schema.validate(sandwich);
}

exports.Sandwich = Sandwich; 
exports.validate = validateSandwich