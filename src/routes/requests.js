const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// like or ignore the profile Request
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

module.exports = requestRouter;
