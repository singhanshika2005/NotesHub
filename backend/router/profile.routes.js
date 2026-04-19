const express = require("express");
const router = express.Router();
const Auth = require("../schema/auth.model");

// ==============================
// ✅ GET PROFILE
// ==============================
router.get("/:id", async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("GET PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ==============================
// ✅ UPDATE PROFILE
// ==============================
router.put("/:id", async (req, res) => {
  try {
    // 🔧 Optional: Clean phone number (+91 / 0 remove)
    if (req.body.phone) {
      req.body.phone = req.body.phone.replace(/^(\+91|0)/, "");
    }

    const updatedUser = await Auth.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after", // ✅ latest mongoose
        runValidators: true,     // ✅ apply schema validation
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    // ✅ Handle validation errors properly
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;