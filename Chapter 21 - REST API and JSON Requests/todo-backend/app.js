// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');

const MONGO_URL = "mongodb+srv://pramodkumar011010_db_user:BWBHhjqhC8us8VGm@airbnb.pr3ts3z.mongodb.net/todo?retryWrites=true&w=majority&appName=airbnb";

//Local Module 
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');

const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));

app.use(errorsController.error404);

const PORT = 3000;

mongoose.connect(MONGO_URL).then(()=>{
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});