const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  console.log("Session Value:", req.session)
  Home.find().then(registeredHomes =>
    res.render('store/home', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'home',
      isLoggedIn: req.session.isLoggedIn,
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
      })
    }
  })
};

exports.getFavoriteList = (req, res, next) => {
  Favorite.find()
    .populate('houseId')
    .then(favorites => {
      const favoriteHomes = favorites.map(fav => fav.houseId);
      res.render('store/favorite-list', {
        favoriteHomes: favoriteHomes,
        pageTitle: 'My Favorites - StayFinder',
        currentPage: 'favorites',
        isLoggedIn: req.session.isLoggedIn,
      })
    });
};

exports.postAddToFavorite = (req, res, next) => {
  const homeId = req.body.id;
  Favorite.findOne({ houseId: homeId }).then(existingFav => {
    if (existingFav) {
      console.log("Already marked as favorite");
    } else {
      fav = new Favorite({ houseId: homeId });
      fav.save().then(result => {
        console.log('fav added: ', result);
      }).catch(err => {
        console.log("Error while marking favorite: ", err);
      });
    }
    res.redirect('/favorites');
  }).catch(err => {
    console.log("Error while finding favorite: ", err);
  })
};

exports.postRemoveFromFavorite = (req, res, next) => {
  const homeId = req.params.homeId
  Favorite.findOneAndDelete({ houseId: homeId }).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing Favorite: ", err);
  }).finally(() => {
    res.redirect('/favorites');
  })

}

exports.getReserve = (req, res, next) => {
  Home.find().then(registeredHomes => res.render('store/reserve', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'Complete Your Reservation - StayFinder',
    currentPage: 'reserve',
    isLoggedIn: req.session.isLoggedIn,
  }));
};
exports.getBookings = (req, res, next) => {
  Home.find().then(registeredHomes => res.render('store/bookings', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'My Bookings - StayFinder',
    currentPage: 'bookings',
    isLoggedIn: req.session.isLoggedIn,
  }));
};