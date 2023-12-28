require("dotenv").config();
const connectDB=require('./db/connect')
const productsRouter=require('./routes/products')
require("express-async-errors");

const express = require("express");
const app = express();
const not_found_middle_ware = require("./middleware/not-found");
const error_middle_ware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`<h1>store api </h1><a href="api/v1/products">products route</a>`);
});
app.use('/api/v1/products',productsRouter);//! balak tzid tensa / fel bedya  

app.use(not_found_middle_ware);
app.use(error_middle_ware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening to ${port} port...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();