const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      // validate (value){
      //   if(validator.isStrongPassword(value)){
      //     throw new Error("Password should be strong!!" + value);
      //   }
      // }
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL!!");
        }
      },
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
