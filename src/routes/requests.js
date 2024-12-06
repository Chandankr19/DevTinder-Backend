const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

// Send Connection Request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending connection request
  res.send(
    `${user.firstName} ${user.lastName} sent the connection request.....`
  );
});

module.exports = requestRouter;
