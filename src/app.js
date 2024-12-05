const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./helpers/validation");
const passwordEncryption = require("./helpers/passEncryption");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/auth");

// Middleware to parse JSON data
app.use(express.json());
app.use(cookieParser());

// API to add the user into database
app.post("/signup", async (req, res) => {
  try {
    //VALIDATE THE DATA
    validateSignUpData(req);
    const { firstName, lastName, emailId, age, gender, photoUrl, skills } =
      req.body;
    //ENCRYPT THE PASSWORD
    const passwordHash = await passwordEncryption(req);
    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      skills,
    });

    const savedUser = await user.save();
    res.send("User added successfully!!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// USER LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(401).send("Invalid credentials!!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //call JWT token method
      const token = await user.getJWT();
    
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
      res.status(200).send("Logged in successfully");
    } else {
      res.status(401).send("Invalid credentials!!");
    }
  } catch (err) {
    res.status(500).send(`Error logging in user: ${err.message}`);
  }
});

// Send Connection Request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending connection request
  res.send(`${user.firstName} ${user.lastName} sent the connection request.....`)
});

// USER PROFILE
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
