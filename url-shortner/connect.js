const mongoose = require("mongoose");

async function connectToMongoDb(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected!");
  } catch (error) {
    console.error("Failed to connect to MongoDb", error);
  }
}

module.exports = {
  connectToMongoDb,
};
