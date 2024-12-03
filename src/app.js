const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// Middleware to parse JSON data
app.use(express.json());

// API to add the user into database
app.post("/signup", async (req, res) => {
  // creating a new instance of the User model
  // const user = new User({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   emailId: req.body.emailId,
  //   password: req.body.password,
  //   age: req.body.age,
  //   gender: req.body.gender,
  // });

  // instead of above we can directly pass the Data to the database
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.send("User added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// API to get all the users  from database
app.get("/users", async (req, res) => {
  try {
    const userAll = await User.find();

    // res.send(users);
    res.status(200).json(userAll);
  } catch (err) {
    res.status(500).send("Error retrieving users: " + err.message);
  }
});

// API to get  user from their emailId
app.get("/userByEmail", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).send("Error while retrieving user: " + err.message);
  }
});

//API to delete the user by userId from database
app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      res.status(200).send(`User with ID ${userId} has been deleted`);
    } else {
      res.status(404).send(`User with ID ${userId} not found`);
    }
  } catch (err) {
    res.status(500).send(`Error deleting user: ${err.message}`);
  }
});

// API to update the user by userId
app.patch("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the URL parameters
    const updates = req.body; // Extract the fields to update from the request body

    // Using findByIdAndUpdate to find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId, // find user by ID
      updates, // Update fields provided in the request body
      { returnDocument: "after" }  // Return the updated document
      // { new: true } // It will also returned the updated documents
    );

    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send(`User with ID ${userId} not found`);
    }
  } catch (err) {
    res.status(500).send(`Error updating user: ${err.message}`);
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
