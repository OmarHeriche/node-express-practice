const mongoose = require("mongoose");
//? the representation of my collection :)
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter a name hfdak :)"],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("task", TaskSchema); //? to apply the http methods in my schema:)
