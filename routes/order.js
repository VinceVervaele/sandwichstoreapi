const { Order, validate } = require("../models/order");
const mongoose = require("mongoose");
const express = require("express");
const { Sandwich } = require("../models/sandwich");
const { Customer } = require("../models/customer");
const { Drink } = require("../models/drink");
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const orders = await Order.find().sort("name");
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const retrievedCustomer = await Customer.findById(req.body.customer);
    if (!retrievedCustomer) return res.status(400).send("Invalid customer.");

    const retrievedSandwiches = await Sandwich.find({
      _id: { $in: req.body.sandwiches },
    });
    if (retrievedSandwiches.length !== req.body.sandwiches.length)
      return res.status(400).send("Invalid sandwiches");

    const retrievedDrinks = await Drink.find({ _id: { $in: req.body.drinks } });
    if (retrievedDrinks.length !== req.body.drinks.length)
      return res.status(400).send("Invalid drinks");

    let order = new Order({
      customer: {
        _id: retrievedCustomer._id,
        name: retrievedCustomer.name,
        phone: retrievedCustomer.phone,
      },
      sandwiches: retrievedSandwiches.map((sandwich) => ({
        _id: sandwich._id, 
        name: sandwich.name,
        price: sandwich.price,
        ingredients: sandwich.ingredients,
      })),
      drinks: retrievedDrinks.map((drink) => ({
        _id: drink._id, 
        name: drink.name,
        price: drink.price,
        amountInStock: drink.amountInStock,
      })),
      orderDate: Date.now(),
      deliverDate: req.body.deliverDate,
    });
    order = await order.save();

    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).send("The order with the given ID was not found.");

    res.send(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
