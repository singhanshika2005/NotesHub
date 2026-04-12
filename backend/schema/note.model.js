const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      minlength: [3, "Title must be atleast 3 characters"],
      maxlength: [100, "Title must be atmost 100 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required!"],
      minlength: [3, "Description must be atleast 3 characters"],
      trim: true,
    },

    tag: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: null,
    },

    // 🔥 FIX HERE
    isPrivate: {
      type: Boolean,
      required: true, // ✅ force value to always come
      default: false, // ✅ safer default (public)
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: [true, "User id required!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);