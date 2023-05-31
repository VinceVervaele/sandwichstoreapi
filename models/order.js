const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
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
      }    
    }),  
    required: true
  },
  sandwiches: [{
    type: new mongoose.Schema({
      name: {
      type: String,
      required: true,
      minlength: 2,
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
   })
  }],
  drinks: [{
    type: new mongoose.Schema({
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
   })
  }],
  orderDate: {
    type: Date,
    default: Date.now()
  },
  deliverDate: {
    type: Date,
    required: true,
  }
}));

function validateOrder(order) {
  const schema = Joi.object({
    customer: Joi.objectId().required(),
    sandwiches: Joi.array().items(Joi.objectId().required()),
    drinks: Joi.array().items(Joi.objectId().required()),
    orderDate: Joi.date(),
    deliverDate: Joi.date().required(),
  });

  return schema.validate(order);
}

exports.Order = Order; 
exports.validate = validateOrder