const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chandancts19:D8d9crcABMYaL9Rc@codeaps.j3ks2.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

