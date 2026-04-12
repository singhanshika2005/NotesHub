const express = require("express");
const router = express.Router();
const Review = require("../schema/review.model");

// 🔐 Simple Auth Middleware
const checkAuth = (req, res, next) => {
  const userId = req.headers.userid;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Login required",
    });
  }

  req.user = { id: userId };
  next();
};


// ✅ GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// ✅ POST new review (with validation)
router.post("/", async (req, res) => {
  try {
    const { name, image, rating, review, userId } = req.body;

    // 🔥 Important validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const newReview = new Review({
      name,
      image,
      rating,
      review,
      userId,
    });

    await newReview.save();

    res.json({
      success: true,
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving review",
    });
  }
});


// ❌ DELETE review (ONLY OWNER)
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // 🔥 Strong ownership check
    if (String(review.userId) !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your review",
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;