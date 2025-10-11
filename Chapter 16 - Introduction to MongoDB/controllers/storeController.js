const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  Home.fetchAll().then(registeredHomes =>
    res.render('store/home', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'home'
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
      })
    }
  })
};

exports.getFavoriteList = (req, res, next) => {
  Favorite.getFavorites().then(favorites => {
    favorites = favorites.map(fav => fav.houseId)
    Home.fetchAll().then(registeredHomes => {
      console.log(favorites, registeredHomes);
      const favoriteHomes = registeredHomes.filter(home =>
        favorites.includes(home._id.toString()));
      res.render('store/favorite-list', {
        favoriteHomes: favoriteHomes,
        pageTitle: 'My Favorites - StayFinder',
        currentPage: 'favorites',
      })
    });
  })

};

exports.postAddToFavorite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favorite(homeId);
  fav.save().then(result => {
    console.log('fav added: ', result);
  }).catch(err => {
    console.log("Error while marking favorite: ", err);
  }).finally(() => {
    res.redirect('/favorites');
  })
};

exports.postRemoveFromFavorite = (req, res, next) => {
  const homeId = req.params.homeId
  Favorite.deleteById(homeId).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing Favorite: ", err);
  }).finally(() => {
    res.redirect('/favorites');
  })

}

exports.getReserve = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => res.render('store/reserve', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'Complete Your Reservation - StayFinder',
    currentPage: 'reserve'
  }));
};
exports.getBookings = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => res.render('store/bookings', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'My Bookings - StayFinder',
    currentPage: 'bookings'
  }));
};