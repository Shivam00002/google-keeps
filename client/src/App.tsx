import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./contexts/AuthContext";
import Notes from "./pages/Notes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Navbar />
        {/* <Notes /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;