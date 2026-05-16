const express = require("express");
const router = express.Router();

const Address = require("../models/Address");


router.post("/", async (req, res) => {
  try {
    const address = new Address(req.body);

    const savedAddress = await address.save();

    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();

    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;