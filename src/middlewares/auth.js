const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from req cookies
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedObj = await jwt.verify(token, "ASPEN@Tinder$1920");
    const { _id } = decodedObj;

    console.log(decodedObj);

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }

  // Validate token
  // find the user
};

module.exports = {
  userAuth
};
