const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: [
      true,
      "3lah tmdli empty product , enter the name of the product",
    ],
  },
  price: {
    type: Number,
    required: [true, "the price must be provided"],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"],
  },
});
module.exports = mongoose.model("product", productSchema);
