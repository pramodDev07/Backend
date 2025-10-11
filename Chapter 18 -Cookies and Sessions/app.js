// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module 
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded());
app.use(authRouter);
app.use(storeRouter);
app.use("/host", hostRouter);
// app.use(hostRouter);
app.use(errorsController.error404);

const PORT = 3000;
// BWBHhjqhC8us8VGm// pasowrd
const MONGO_URL = "mongodb+srv://pramodkumar011010_db_user:BWBHhjqhC8us8VGm@airbnb.pr3ts3z.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

mongoose.connect(MONGO_URL).then(()=>{
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});