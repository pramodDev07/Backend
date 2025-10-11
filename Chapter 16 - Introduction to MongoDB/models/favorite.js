const { getDB } = require("../utils/databaseUtil");

module.exports = class Favorite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
    return db.collection('favorites').findOne({houseId: this.houseId}).then(existingFav => {
      if(!existingFav) {
        return db.collection('favorites').insertOne(this);
      }
        return Promise.resolve();
    })
  }

  static getFavorites() {
    const db = getDB();
    return db.collection('favorites').find().toArray();
  };

  static deleteById(delHomeId) {
      const db = getDB();
      return db.collection('favorites').deleteOne({ houseId: delHomeId});
  }
};
