// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module 
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');
const {mongoConnect} = require('./utils/databaseUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);
// app.use(hostRouter);
app.use(errorsController.error404);

const PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});