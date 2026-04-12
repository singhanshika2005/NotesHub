const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "https://i.pravatar.cc/150",
    },

    // 🔥 MOST IMPORTANT (this was missing)
    userId: {
      type: String, // you can switch to ObjectId later
      required: true,
    },

    // ❤️ Optional (for likes feature)
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);