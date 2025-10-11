// Core Module
const path = require('path');

// External Module
const express = require('express');
const homeRouter = express.Router();

//Local Module
const rootDir = require('../utils/pathUtil')

// homeRouter.use((req, res, next) =>{
//   console.log(req.path,'path');
//   next();
// });

// homeRouter.use((req, res, next) =>{
//   console.log(req.method,'method');
//   next();
// });

// homeRouter.use((req, res, next) =>{
//   console.log('Send Response');
//   res.send("<h1>Wellcom to Home Page</h1>");
// });


homeRouter.get('/',(req, res, next) =>{
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
});

module.exports = homeRouter;