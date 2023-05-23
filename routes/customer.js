const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


router.get("/", [auth, admin], async (req, res, next) => {
  try {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({email: req.body.email});
    if(customer) res.status(400).send("Customer already exists")

    customer = new Customer({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    });
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(req.body.password, salt);
    customer.isAdmin = req.isAdmin;
    customer = await customer.save();

    const token = customer.generateAuthToken();
    res.header('x-auth-token', token).send(customer);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
      },
      { new: true }
    );

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", [auth, admin], async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", [auth, admin], async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
