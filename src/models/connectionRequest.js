const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

// Compound indexing of mongoose to fast the search query on connectionRequest
connectionRequestSchema.index({ fromUserId:1, toUserId:1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can't send request to yourself!!");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
