// External Module
const express = require('express');
const hostRouter = express.Router();
// Local Module
const hostController = require('../controllers/hostController')

hostRouter.get("/add-home", hostController.getAddHome)
  .post("/add-home", hostController.postAddHome)
  // .get("/edit-home", hostController.getEditHome)
  .get("/host-home-list", hostController.getHostHomeList)
  .get("/edit-home/:homeId", hostController.getEditHome)
  .post("/edit-home", hostController.postEditHome)
  .post("/delete-home/:homeId", hostController.postDeleteHome)

module.exports = hostRouter;
