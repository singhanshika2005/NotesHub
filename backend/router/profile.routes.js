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

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("GET PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ==============================
// ✅ UPDATE PROFILE (INCLUDING AVATAR)
// ==============================
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await Auth.findByIdAndUpdate(
      req.params.id,
      req.body, // 👈 includes avatar also
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;