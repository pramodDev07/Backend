// Core Module
const fs = require('fs')
const path = require('path')
// Local Module
const rootDir = require('../utils/pathUtil');

const homeDataPath = path.join(rootDir, 'data', 'homes.json');

module.exports = class Home {
  constructor(houseName, price, location, rating, image) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.image = image;
  }
  save() {
    this.id = Math.random().toString();
   Home.fetchAll(registeredHomes => {
     registeredHomes.push(this);
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
      console.log("File Writing Concluded", error);
    });
   });
  }

  // static fetchAll() {
  //   return registeredHomes;
  // }
  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      // console.log('file read:',err, data)
      callback(!err ? JSON.parse(data) : [] );
    });
  }

  static findById(homeId, callback){
    this.fetchAll(homes => {
    const homeFound =  homes.find(home => home.id === homeId);
    callback(homeFound);
    })
  }
};
