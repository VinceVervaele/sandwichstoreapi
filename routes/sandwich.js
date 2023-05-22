const {Sandwich, validate} = require('../models/sandwich'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const sandwiches = await Sandwich.find().sort('name');
  res.send(sandwiches);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let sandwich = new Sandwich({ 
    name: req.body.name,
    price: req.body.price,
    ingredients: req.body.ingredients
  });
  sandwich = await sandwich.save();
  
  res.send(sandwich);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const sandwich = await Sandwich.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients
    }, { new: true });

  if (!sandwich) return res.status(404).send('The sandwich with the given ID was not found.');
  
  res.send(sandwich);
});

router.delete('/:id', async (req, res) => {
  const sandwich = await Sandwich.findByIdAndRemove(req.params.id);

  if (!sandwich) return res.status(404).send('The sandwich with the given ID was not found.');

  res.send(sandwich);
});

router.get('/:id', async (req, res) => {
  const sandwich = await Sandwich.findById(req.params.id);

  if (!sandwich) return res.status(404).send('The sandwich with the given ID was not found.');

  res.send(sandwich);
});

module.exports = router; 