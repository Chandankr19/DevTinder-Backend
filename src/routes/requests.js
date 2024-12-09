const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// like or ignore the profile
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignored"];

      // Check that toUserId is exist in database or not
      const isValidToUserId = await User.findById(toUserId);
      if (!isValidToUserId) {
        return res.status(404).json({ message: "User doesn't exist!!" });
      }

      // for this I'm using pre method of mongoose which is in connectionRequest
      // if (toUserId == fromUserId) {
      //   return res
      //     .status(400)
      //     .json({ message: "You can't send request to yourself!!" });
      // }

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status types: " + status });
      }

      // check if connection request already exist in the database
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exist.",
        });
      }

      const connectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      const connectionRequestData = await connectionRequest.save();

      if (status === "interested") {
        return res.json({
          message: "Connection Request Sent Successfully!!",
          connectionRequestData,
        });
      } else if (status === "ignored") {
        return res.json({
          message: "Connection ignored!!",
          connectionRequestData,
        });
      }
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

// API to accept or reject the connection request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status." });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request doesn't exist!!" });
      }

      if (connectionRequest.status === "accepted") {
        return res.json({
          message: `${loggedInUser.firstName} already accepted your connection request!!`,
        });
      } else if (connectionRequest.status === "rejected") {
        return res.json({
          message: `${loggedInUser.firstName} already rejected your connection request!!`,
        });
      }

      connectionRequest.status = status;
      const updatedRequest = await connectionRequest.save();
      if (status === "accepted") {
        res.json({
          message: `${loggedInUser.firstName} accepted your connection request!!`,
          updatedRequest,
        });
      } else {
        res.json({
          message: `${loggedInUser.firstName} rejected your connection request!!`,
          updatedRequest,
        });
      }
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
