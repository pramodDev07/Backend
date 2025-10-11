const { ObjectId } = require('mongodb');
const { mongoConnect, getDB } = require('../utils/databaseUtil');

module.exports = class Home {
  constructor(houseName, price, location, rating, image, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.image = image;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }
  save() {
    const db = getDB();
    if (this._id) { // UPDATE
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        image: this.image,
        description: this.description
      }
      return db.collection('homes').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFields });
    } else { // INSERT
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(homeId)) });
  }

};
