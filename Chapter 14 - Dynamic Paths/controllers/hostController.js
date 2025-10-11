const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'host-home-list',
    editing: false,
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
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true" // check true and false because by default is string not a boolean

  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found for editing.")
    }

    console.log(homeId, editing, home)
    res.render('host/edit-home', {
      home: home,
      pageTitle: 'Edit Property - StayFinder',
      currentPage: 'host-home-list',
      editing: editing,
    });
  })
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home.save();

  res.redirect("/host/host-home-list")
};

exports.postEditHome = (req, res, next) => {
  const {id, houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home.id = id;
  home.save();

  res.redirect("/host/host-home-list")
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete', homeId)
  Home.deleteById(homeId, error => {
    if(error) {
      console.log("Error while deleting ", error);
    }
      res.redirect("/host/host-home-list")
  })
};
