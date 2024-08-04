const express = require("express");
const router = express.Router();
const admin = require("../config/firebaseConfig");
const verifyAuth = require("../middleware/auth");


router.get("/", verifyAuth, async (req, res) => {
  const userId = req.user.uid;
  console.log('GET /notes userId:', userId); // Debug log

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

router.post("/", verifyAuth, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.uid;
  console.log('POST /notes userId:', userId); // Debug log

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const username = userDoc.data().username;

    const newNote = await admin.firestore().collection("notes").add({
      userId,
      username,
      title,
      content,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: newNote.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
