// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_URL = "mongodb+srv://pramodkumar011010_db_user:BWBHhjqhC8us8VGm@airbnb.pr3ts3z.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

//Local Module 
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
});

const randomSting = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images/');
    } else if (file.fieldname === 'pdfPath') {
      cb(null, 'uploads/rules/');
    }
  },
  filename: (req, file, cb) => {
    const homeId = req.params.homeId; 
    console.log(req.body, req.params.homeId,req.file)
    if (file.fieldname === 'image') {
      cb(null, randomSting(10) + '-' + file.originalname);
    } else if (file.fieldname === 'pdfPath') {
      cb(null, `House Rules-${homeId}.pdf`);
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'  || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage, fileFilter
}

app.use(express.urlencoded());
// Configure multer fields for different file types
const upload = multer(multerOptions).fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdfPath', maxCount: 1 },
]);
app.use(upload);
// app.use(multer(multerOptions).single('image'));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/host/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/home-page/uploads', express.static(path.join(rootDir, 'uploads')));
app.use(session({
  secret: "promoted Ai with complete coding",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
app.use(errorsController.error404);

const PORT = 3000;

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});