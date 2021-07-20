const mongoose = require("mongoose");
const config  = require("../config/config")

// Connection esatblished
mongoose.connect(config.mongo.url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// console.log(mongoose.connection.readyState);