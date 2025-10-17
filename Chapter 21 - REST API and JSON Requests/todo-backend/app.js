// Core Module

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

const MONGO_URL = "mongodb+srv://pramodkumar011010_db_user:BWBHhjqhC8us8VGm@airbnb.pr3ts3z.mongodb.net/todo?retryWrites=true&w=majority&appName=airbnb";

//Local Module 
const errorsController = require('./controllers/errors');
const todoItemsRouter = require('./routes/todoItemsRouter');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use('/api/todo', todoItemsRouter)

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