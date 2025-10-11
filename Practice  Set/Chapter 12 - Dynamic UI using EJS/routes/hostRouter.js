// Core Module
const path = require('path');
// External Module
const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb', currentPage: 'addHome' });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);
  registeredHomes.push(req.body);
  res.render('homeAdded', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded' });
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;