const express = require("express");
const router = express.Router();
const authHelpers = require("../utils/authHelpers");
const admin = require("../config/firebaseConfig");

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await authHelpers.hashPassword(password);

    const userRecord = await admin.auth().createUser({ email });

    await admin.firestore().collection("users").doc(userRecord.uid).set({
      username,
      email,
      password: hashedPassword,
    });

    const token = authHelpers.createToken({ uid: userRecord.uid }, "24h");
    authHelpers.setSecureCookie(res, "session", token, 24 * 60 * 60 * 1000);

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    // Check if the user exists in Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .get();
    const userData = userDoc.data();

    if (!userData || !userData.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await authHelpers.comparePassword(
      password,
      userData.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = authHelpers.createToken({ uid: userRecord.uid }, "24h");

    authHelpers.setSecureCookie(res, "session", token, 24 * 60 * 60 * 1000);

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ error: "Invalid email or password" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
