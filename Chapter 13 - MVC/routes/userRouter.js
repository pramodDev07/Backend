// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const storeController = require('../controllers/storeController')

userRouter.get("/", storeController.getHome)
.get("/home-page/:homeId", storeController.getDetailPage)
.get("/favorites", storeController.getFavoriteList)
.get("/reserve", storeController.getReserve)
.get("/bookings", storeController.getBookings)
.post("/favorites", storeController.postAddToFavorite)

module.exports = userRouter;