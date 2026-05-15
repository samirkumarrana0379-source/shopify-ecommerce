
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port 5000`);
});