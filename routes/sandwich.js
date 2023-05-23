const { Sandwich, validate } = require("../models/sandwich");
const mongoose = require("mongoose");
const express = require("express");
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sandwiches = await Sandwich.find().sort("name");
    res.send(sandwiches);
  } catch (err) {
    next(err);
  }
});

router.post("/", [auth, admin], async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let sandwich = new Sandwich({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
    });
    sandwich = await sandwich.save();

    res.send(sandwich);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", [auth, admin] , async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sandwich = await Sandwich.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
      },
      { new: true }
    );

    if (!sandwich)
      return res
        .status(404)
        .send("The sandwich with the given ID was not found.");

    res.send(sandwich);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", [auth, admin],  async (req, res, next) => {
  try {
    const sandwich = await Sandwich.findByIdAndRemove(req.params.id);

    if (!sandwich)
      return res
        .status(404)
        .send("The sandwich with the given ID was not found.");

    res.send(sandwich);
  } catch (err) {
    next(err);
  }
});

router.get("/:id",  async (req, res, next) => {
  try {
    const sandwich = await Sandwich.findById(req.params.id);

    if (!sandwich)
      return res
        .status(404)
        .send("The sandwich with the given ID was not found.");

    res.send(sandwich);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
