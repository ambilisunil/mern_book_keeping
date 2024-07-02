const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    userId: {
      type: String,

    },
    
    
    author: {
      type: String,
      trim: true,
      uppercase: true,
      default:"UNKNOWN"

    },
    publisher: {
      type: String,
      trim: true,
      uppercase: true,
      default:"UNKNOWN"


    },
    index: {
      type: Number,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      uppercase: true,
      default:""

    },
    otherDetails: {
      type: String,
      trim: true,
      uppercase: true,
      default:""
    },
    
  },
  {
    timestamps: true,
  }
);


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
