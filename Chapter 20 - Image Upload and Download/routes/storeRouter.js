// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const storeController = require('../controllers/storeController')

storeRouter.get("/", storeController.getHome)
.get("/home-page/:homeId", storeController.getDetailPage)
.get("/favorites", storeController.getFavoriteList)
.get("/reserve", storeController.getReserve)
.get("/bookings", storeController.getBookings)
.post("/favorites", storeController.postAddToFavorite)
.post("/favorites/delete/:homeId", storeController.postRemoveFromFavorite)
.get("/rules/:homeId", storeController.getHomeRules)

module.exports = storeRouter;