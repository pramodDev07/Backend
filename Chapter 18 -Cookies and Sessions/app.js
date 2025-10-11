// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_URL = "mongodb+srv://pramodkumar011010_db_user:BWBHhjqhC8us8VGm@airbnb.pr3ts3z.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

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

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
});

app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded());
app.use(session({
  secret: "promoted Ai with complete coding",
  resave: false,
  saveUninitialized: true,
  store
}));


// app.use((req, res, next) => {
//   req.session.isLoggedIn = req.session.isLoggedIn;
//   // console.log("Cookies: ", req.get('Cookie'));
//   // req.session.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : false;
//   next();
// });


app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
   next();
  }else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
// app.use(hostRouter);
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