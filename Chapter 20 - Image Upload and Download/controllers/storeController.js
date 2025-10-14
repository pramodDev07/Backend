const Home = require("../models/home");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
  console.log("Session Value:", req.session)
  Home.find().then(registeredHomes =>
    res.render('store/home', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'home',
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    }));
};

exports.getDetailPage = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home Details Not Found");
      res.redirect("/");
    } else {
      res.render('store/home-detail', {
        home: home,
        pageTitle: 'Detail Page',
        currentPage: 'home',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      })
    }
  })
};

exports.getFavoriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favorites');
  res.render('store/favorite-list', {
    favoriteHomes: user.favorites,
    pageTitle: 'My Favorites - StayFinder',
    currentPage: 'favorites',
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavorite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favorites.includes(homeId)) {
    user.favorites.push(homeId);
    await user.save();
  }
  res.redirect('/favorites');
};

exports.postRemoveFromFavorite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favorites.includes(homeId)) {
    user.favorites = user.favorites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect('/favorites');
};

exports.getReserve = (req, res, next) => {
  Home.find().then(registeredHomes => res.render('store/reserve', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'Complete Your Reservation - StayFinder',
    currentPage: 'reserve',
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  }));
};
exports.getBookings = (req, res, next) => {
  Home.find().then(registeredHomes => res.render('store/bookings', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'My Bookings - StayFinder',
    currentPage: 'bookings',
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  }));
};