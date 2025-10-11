const path = require('path');
// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const { registeredHomes } = require('./hostRouter');

userRouter.get("/", (req, res, next) => {
  console.log(req.url )
  console.log(registeredHomes);
  res.render('home', { registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'home' });
});

module.exports = userRouter;