const express = require("express");
const NotesModel = require("../schema/note.model");
const AuthVerify = require("../middleware/authverify.middleware");
const upload = require("../middleware/multer");
const uploadOnCloudinary = require("../utils/cloudinary");

const router = express.Router();

/* ===========================
   ✅ CREATE NOTE
=========================== */
router.post(
  "/create",
  AuthVerify,
  upload.single("image"),
  async (req, res) => {
    try {
      let { title, description, tag, isPrivate } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and Description are required",
        });
      }

      // ✅ BOOLEAN FIX
      const parsedPrivate =
        isPrivate === "false" || isPrivate === false ? false : true;

      // ✅ TAG FIX
      let parsedTag = [];
      if (tag) {
        try {
          parsedTag = typeof tag === "string" ? JSON.parse(tag) : tag;
        } catch {
          parsedTag = [];
        }
      }

      // ✅ IMAGE UPLOAD
      let imageUrl = null;
      if (req.file && req.file.buffer) {
        imageUrl = await uploadOnCloudinary(req.file.buffer);
      }

      const note = await NotesModel.create({
        title,
        description,
        tag: parsedTag,
        isPrivate: parsedPrivate,
        image: imageUrl,
        createdBy: req.user,
      });

      return res.status(201).json({
        success: true,
        message: "Note added successfully!",
        note,
      });
    } catch (error) {
      console.error("CREATE NOTE ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
);

/* ===========================
   ✅ GET YOUR NOTES
=========================== */
router.get("/yournotes", AuthVerify, async (req, res) => {
  try {
    const notes = await NotesModel.find({ createdBy: req.user })
      .sort({ updatedAt: -1 })
      .populate("createdBy");

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

/* ===========================
   ✅ GET PUBLIC NOTES
=========================== */
router.get("/public", async (req, res) => {
  try {
    const notes = await NotesModel.find({ isPrivate: false })
      .sort({ updatedAt: -1 })
      .populate("createdBy");

    return res.status(200).json({
      success: true,
      notes, // ✅ MATCH FRONTEND
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

/* ===========================
   ✅ DELETE NOTE
=========================== */
router.delete("/delete/:noteId", AuthVerify, async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await NotesModel.findOne({
      _id: noteId,
      createdBy: req.user,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await note.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});
// ✅ GET USER PROFILE NOTES
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await NotesModel.find({
      createdBy: userId,
      isPrivate: false, // 🔥 ONLY PUBLIC NOTES
    })
      .sort({ updatedAt: -1 })
      .populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      notes,
      user: notes[0]?.createdBy || null,
    });
  } catch (error) {
    console.error("USER PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;