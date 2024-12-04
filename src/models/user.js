const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.inforwaves.com/media/2021/04/dummy-profile-pic-300x300-1.png",
    },
    about: {
      type: String,
      default: "This is a default value",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
