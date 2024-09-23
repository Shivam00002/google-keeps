const express = require("express");
const router = express.Router();
const multer = require("multer");
const admin = require("../config/firebaseConfig");
const verifyAuth = require("../middleware/auth");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Get notes for the authenticated user
router.get("/", verifyAuth, async (req, res) => {
  const userId = req.user.uid;
  console.log("GET /notes userId:", userId); // Debug log

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const notesSnapshot = await admin
      .firestore()
      .collection("notes")
      .where("userId", "==", userId)
      .get();

    const notes = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new note with attachment
router.post("/", verifyAuth, upload.single('file'), async (req, res) => {
  const file = req.file;
  const { title, content } = req.body;
  const userId = req.user.uid;

  console.log("POST /notes userId:", userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const userDoc = await admin.firestore().collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const username = userDoc.data().username;

    const newNote = await admin.firestore().collection("notes").add({
      userId,
      username,
      title,
      content,
      file_url: file ? `/public/${file.filename}` : null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });


    res.status(201).json({ id: newNote.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update note
router.put("/:id", verifyAuth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.uid;

  try {
    const noteDoc = await admin.firestore().collection("notes").doc(id).get();
    if (!noteDoc.exists || noteDoc.data().userId !== userId) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    await admin.firestore().collection("notes").doc(id).update({
      title,
      content,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete note
router.delete("/:id", verifyAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;

  try {
    const noteDoc = await admin.firestore().collection("notes").doc(id).get();
    if (!noteDoc.exists || noteDoc.data().userId !== userId) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    await admin.firestore().collection("notes").doc(id).delete();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;