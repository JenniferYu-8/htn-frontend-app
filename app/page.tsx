"use client";
import React, { useState, useEffect } from "react";
import Events from "@/components/events";
import Login from "@/components/login";
import Footer from "@/components/footer";

export default function Home() {
  // Initialize the loggedIn state from localStorage
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for stored login status
    const storedLoginStatus = localStorage.getItem("loggedIn");
    if (storedLoginStatus === "true") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
      <Login onLoginStatusChange={setLoggedIn} />
      <h1 className="text-4xl font-bold mt-[3rem] mb-6">🚀 Hack The North Events</h1>
      <Events loggedIn={loggedIn} />
      <Footer/>
    </main>
  );
}
