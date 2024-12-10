const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get(
  "/user/requests/received/pending",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", ["firstName", "lastName"]);

      if (connectionRequest.length === 0) {
        return res
          .status(404)
          .json({ message: "Pending connection request not found!!" });
      }

      const data = connectionRequest.map((row) => row.fromUserId);
      res.json({
        message: "Data fetched successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (connections.length === 0) {
      return res.status(404).json({ message: "Connection not found!!" });
    }

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: "Your connections!",
      data: data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  // find all connection requests (sent+received)
  const connectionRequests = await ConnectionRequest.find({
    $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
  }).select("fromUserId toUserId");

  const hideUsersFromFeed = new Set();
  connectionRequests.forEach((req) => {
    hideUsersFromFeed.add(req.fromUserId.toString());
    hideUsersFromFeed.add(req.toUserId.toString());
  });

  const users = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUsersFromFeed) } },
      { _id: { $ne: loggedInUser._id } },
    ],
  }).select(USER_SAFE_DATA);

  res.send(users);
});
module.exports = userRouter;
