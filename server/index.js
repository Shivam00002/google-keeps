const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

async function StartServer() {
  const app = express();

  // Set CORS options
  const corsOptions = {
    origin: process.env.FRONTEND_URL 
      ? process.env.FRONTEND_URL 
      : ["http://localhost:3000", "https://dainsta-notes-g4in.vercel.app"],
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

  // Routes
  app.use("/auth", authRoutes);
  app.use("/notes", notesRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Start the server
StartServer().catch((error) => {
  console.error("Error starting the server:", error);
});
