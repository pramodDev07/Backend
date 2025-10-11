const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'host-home-list',
    editing: false,
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll().then(registeredHomes =>
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'My Properties - StayFinder Host',
      currentPage: 'host-home-list'
    }));
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true" // check true and false because by default is string not a boolean

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
     return res.redirect("/host/host-home-list");
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
  const { houseName, price, location, rating, image, description } = req.body;
  const home = new Home(houseName, price, location, rating, image, description);
  home.save().then((result) => {
    console.log('Home Update successfully', result);
  })

  res.redirect("/host/host-home-list")
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home._id = id;
  home.save();

  res.redirect("/host/host-home-list")
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete', homeId)
  Home.deleteById(homeId, error => {
    if (error) {
      console.log("Error while deleting ", error);
    }
    res.redirect("/host/host-home-list")
  })
};
