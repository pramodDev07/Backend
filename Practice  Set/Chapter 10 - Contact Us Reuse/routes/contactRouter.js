// Core Module
const path = require('path');

// External Module
const express = require('express');
const contactRouter = express.Router();

//Local Module
const rootDir = require('../utils/pathUtil');

contactRouter.get('/contact-us',(req, res, next) =>{
 res.sendFile(path.join(rootDir, 'views', 'contactForm.html'));

});

contactRouter.post('/contact-us',(req, res, next) =>{
  console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'contactResponse.html'));
});

module.exports = contactRouter;