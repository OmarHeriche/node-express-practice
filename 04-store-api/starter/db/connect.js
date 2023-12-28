// const mongoose = require('mongoose')

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// }

// module.exports = connectDB
const mongoose=require('mongoose');
const connectDB=(url)=>{
  console.log("connected to the DB");
  return mongoose.connect(url);
}
module.exports=connectDB;