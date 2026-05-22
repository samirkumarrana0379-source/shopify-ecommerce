const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  products: Array,
  payment: String,
  status: String,
  orderDate: String,
  deliveryDate: String,
  userEmail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);