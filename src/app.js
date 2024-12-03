const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const user = require("./models/user");

// API to add the user into database
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ashish",
    lastName: "Kumar",
    emailId: "ashishkumar@gamil.com",
    password: "ashishkr@12",
    age: 26,
    gender: "male",
  });

  try {
    const savedUser = await user.save();
    res.send("User added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// API to get user data from database
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    // res.send(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Error retrieving users: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected to MongoDB....");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database is not connected!!");
  });
