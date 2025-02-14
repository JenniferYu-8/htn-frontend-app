"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut } from "lucide-react";

interface LoginProps {
  onLoginStatusChange: (status: boolean) => void;
}

export default function Login({ onLoginStatusChange }: LoginProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Retrieve the login state from localStorage when the component mounts
  useEffect(() => {
    const storedLoginState = localStorage.getItem("loggedIn");
    if (storedLoginState === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === "hacker" && password === "htn2025") {
      setLoggedIn(true);
      setShowLogin(false);
      // Store the login state in localStorage
      localStorage.setItem("loggedIn", "true");
      onLoginStatusChange(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Remove the login state from localStorage
    localStorage.setItem("loggedIn", "false");
    onLoginStatusChange(false);
  };

  return (
    <div className="absolute top-6 right-6 z-50">
      {!loggedIn ? (
        <>
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <LogIn size={18} />
            Login
          </button>

          {showLogin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-3 w-72 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 z-50"
            >
              <h2 className="text-white text-lg font-semibold mb-3">See Private Events 👀</h2>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 mb-2 bg-white/30 text-white placeholder-gray-300 rounded-xl focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-3 bg-white/30 text-white placeholder-gray-300 rounded-xl focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-3 rounded-xl hover:scale-105 transition-transform"
              >
                Login
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <LogOut size={18} />
          Logout
        </button>
      )}
    </div>
  );
}
