const mongoose = require("mongoose");
const favorite = require("./favorite");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: String, required: true },
  image: String,
  description: String,
});

homeSchema.pre('findOneAndDelete', async function(next) {
  console.log("Came to pre hook while deleting a home", this.getQuery());
  const homeId = this.getQuery()._id;
  await favorite.deleteMany({houseId: homeId});
  next();
})

module.exports = mongoose.model('Home', homeSchema);
