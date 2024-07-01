const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    imageUrl: {
     type: String,
      default:""
    }, 
    role: {
      type: String,
      default:"admin"

    },
    emailId: {
      type: Number,
      uppercase: true,
    },
    phoneNumber: {
      type: String,
      default:""

    },
    password: {
      type: String,
      default:""
    },
    
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
