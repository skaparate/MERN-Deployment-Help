const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  numberOfWins: {type: Number, required: true},
  numberOfLosses: {type: Number, required: true},
  teacher: {type: String, required: true, unique: true}
});

// Export the Schema as a model
module.exports = mongoose.model("user", userSchema);