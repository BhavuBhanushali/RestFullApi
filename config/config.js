const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT,
  url: "",
  mongo: {
    hostname: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    url: "",
    db: process.env.MONGO_DB,
  },

  publicPath: "/public",
};
config.mongo.url =
  "mongodb://" +
  config.mongo.hostname +
  ":" +
  config.mongo.port +
  "/" +
  config.mongo.db;

module.exports = config;
