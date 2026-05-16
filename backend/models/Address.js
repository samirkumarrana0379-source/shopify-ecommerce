const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  landmark: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema);