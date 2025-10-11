const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  Home.fetchAll(registeredHomes => res.render('store/home', {
    registeredHomes: registeredHomes,
    pageTitle: 'airbnb Home',
    currentPage: 'home'
  }));
};

exports.getDetailPage = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, home => {
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
  Favorite.getFavorites(favorites => {
    Home.fetchAll(registeredHomes => {
      const favoriteHomes = registeredHomes.filter(home => favorites.includes(home.id));
      res.render('store/favorite-list', {
      favoriteHomes: favoriteHomes,
      pageTitle: 'My Favorites - StayFinder',
      currentPage: 'favorites',
    })
  });
  })

};

exports.postAddToFavorite = (req, res, next) => {
  Favorite.addToFavorite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favorite: ", error)
    }
    res.redirect('/favorites');
  })
}

exports.postRemoveFromFavorite = (req, res, next) => {
  const delHomeId = req.params.homeId
  Favorite.deleteById(delHomeId,error => {
    if(error) {
      console.log("Error while removing from Favorite ", error);
    }
      res.redirect('/favorites');
  })
  
}

exports.getReserve = (req, res, next) => {
  Home.fetchAll(registeredHomes => res.render('store/reserve', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'Complete Your Reservation - StayFinder',
    currentPage: 'reserve'
  }));
};
exports.getBookings = (req, res, next) => {
  Home.fetchAll(registeredHomes => res.render('store/bookings', {
    registeredHomes: registeredHomes[0],
    pageTitle: 'My Bookings - StayFinder',
    currentPage: 'bookings'
  }));
};