// Core Module
const fs = require('fs')
const path = require('path')
// Local Module
const rootDir = require('../utils/pathUtil');

const favoriteDataPath = path.join(rootDir, 'data', 'favorite.json');

module.exports = class Favorite {

  static addToFavorite(homeId, callback) {
    Favorite.getFavorites(favorites => {
      if (favorites.includes(homeId)) {
        callback('Home is already marked favorite');
      } else {
        favorites.push(homeId);
        fs.writeFile(favoriteDataPath, JSON.stringify(favorites), callback);
      }
    });
  };

  static getFavorites(callback) {
    fs.readFile(favoriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  };
};
