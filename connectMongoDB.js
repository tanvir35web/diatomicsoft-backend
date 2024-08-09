const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  await mongoose.connect(url);
  console.log("MongoDB Connected");
  
}

module.exports = {
  connectToMongoDB,
};