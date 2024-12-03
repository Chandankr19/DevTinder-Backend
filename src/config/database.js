const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://chandancts19:D8d9crcABMYaL9Rc@codeaps.j3ks2.mongodb.net/?tls=true"
  );
};

connectDB()
  .then(() => {
    console.log("Database connected to MongoDB....");
  })
  .catch((err) => {
    console.error("Database is not connected!!");
  });
