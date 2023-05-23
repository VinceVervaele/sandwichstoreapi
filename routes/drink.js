const { Drink, validate } = require("../models/drink");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");

router.get("/", async (req, res, next) => {
  try {
    const drinks = await Drink.find().sort("name");
    res.send(drinks);
  } catch (err) {
    next(err);
  }
});

router.post("/", [auth, admin],  async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let drink = new Drink({
    name: req.body.name,
    price: req.body.price,
    amountInStock: req.body.amountInStock,
  });
  drink = await drink.save();

  res.send(drink);
});

router.put("/:id", [auth, admin], async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const drink = await Drink.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        amountInStock: req.body.amountInStock,
      },
      { new: true }
    );

    if (!drink)
      return res.status(404).send("The drink with the given ID was not found.");

    res.send(drink);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", [auth, admin], async (req, res, next) => {
  try {
    const drink = await Drink.findByIdAndRemove(req.params.id);

    if (!drink)
      return res.status(404).send("The drink with the given ID was not found.");

    res.send(drink);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const drink = await Drink.findById(req.params.id);

    if (!drink)
      return res.status(404).send("The drink with the given ID was not found.");

    res.send(drink);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
