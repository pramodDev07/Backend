// BWBHhjqhC8us8VGm// pasowrd
// pramodkumar011010_db_user// usernmae

const mongoDB = require('mongodb');

const MongoClient = mongoDB.MongoClient;

const MONGO_URL = "mongodb+srv://pramodkumar011010_db_user:BWBHhjqhC8us8VGm@airbnb.pr3ts3z.mongodb.net/?retryWrites=true&w=majority&appName=airbnb"

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL).then(client => {
    callback();
    _db = client.db('airbnb');
  }).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
}

const getDB = () => {
  if(!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;