import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      return <Navigate to="/notes" replace />;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/notes" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/notes" replace /> : <Signup />
        }
      />
      <Route
        path="/notes"
        element={isAuthenticated ? <Notes /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Navbar />
        <AppRoutes />
        <Toaster />
      </div>
    </AuthProvider>
  );
};

export default App;
