const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'host-home-list'
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll(registeredHomes => res.render('host/host-home-list', {
    registeredHomes: registeredHomes,
    // res.render('host/host-home-list', {
    pageTitle: 'My Properties - StayFinder Host',
    currentPage: 'host-home-list'
  }));
};

exports.getEditHome = (req, res, next) => {
  Home.fetchAll(registeredHomes => res.render('host/edit-home', {
    registeredHomes: registeredHomes[0],
    // res.render('host/edit-home', {
    pageTitle: 'Edit Property - StayFinder',
    currentPage: 'host-home-list'
  }));
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home.save();

  res.render('host/homeAdded', {
    pageTitle: 'Home Added Successfully',
    currentPage: 'homeAdded'
  });
};
