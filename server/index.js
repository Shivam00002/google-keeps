const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

async function StartServer() {
  const app = express();

  const corsOptions = {
    origin: process.env.FRONTEND_URL || "https://dainsta-notes-g4in-git-main-shivam-dubeys-projects-e404231e.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

  // Welcome route
  app.get("/", (req, res) => {
    res.send("Welcome to the API! 🔥");
  });

  app.use("/auth", authRoutes);
  app.use("/notes", notesRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

StartServer().catch((error) => {
  console.log("error", error);
});
