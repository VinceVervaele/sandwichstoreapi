const {Drink, validate} = require('../models/drink'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const drinks = await Drink.find().sort('name');
  res.send(drinks);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let drink = new Drink({ 
    name: req.body.name,
    price: req.body.price,
    amountInStock: req.body.amountInStock
  });
  drink = await drink.save();
  
  res.send(drink);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const drink = await Drink.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        price: req.body.price,
        amountInStock: req.body.amountInStock
    }, { new: true });

  if (!drink) return res.status(404).send('The drink with the given ID was not found.');
  
  res.send(drink);
});

router.delete('/:id', async (req, res) => {
  const drink = await Drink.findByIdAndRemove(req.params.id);

  if (!drink) return res.status(404).send('The drink with the given ID was not found.');

  res.send(drink);
});

router.get('/:id', async (req, res) => {
  const drink = await Drink.findById(req.params.id);

  if (!drink) return res.status(404).send('The drink with the given ID was not found.');

  res.send(drink);
});

module.exports = router; 