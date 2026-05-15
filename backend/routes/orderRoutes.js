const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Save order
router.post("/add", async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;