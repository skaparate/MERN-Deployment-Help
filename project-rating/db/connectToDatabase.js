const mongoose = require("mongoose");
const URI = require("../config/key");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI.mongoURI, 
      {useUnifiedTopology: true, useNewUrlParser: true, 
      useCreateIndex: true}, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesfully connected to the database");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDatabase;