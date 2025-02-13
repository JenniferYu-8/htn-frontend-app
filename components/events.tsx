"use client";
import React from 'react'

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "https://api.hackthenorth.com/v3/events";

type TEventType = "workshop" | "activity" | "tech_talk";
type TPermission = "public" | "private";

type TSpeaker = {
  name: string;
};

type TEvent = {
  id: number;
  name: string;
  event_type: TEventType;
  permission?: TPermission;
  start_time: number;
  end_time: number;
  description?: string;
  speakers: TSpeaker[];
  public_url?: string;
  private_url: string;
  related_events: number[];
};

export default function Events() {
    const [events, setEvents] = useState<TEvent[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data: TEvent[]) => {
          const sortedEvents = data.sort((a, b) => a.start_time - b.start_time);
          setEvents(sortedEvents);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Hack The North Events</h1>
    {!loggedIn && (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mr-2 text-gray-900"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mr-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setLoggedIn(username === "hacker" && password === "htn2025")} className="bg-blue-500 text-white p-2">
          Login
        </button>
      </div>
    )}
    <ul className="flex gap-2 flex-wrap">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {events
        .filter((event) => loggedIn || event.permission !== "private")
        .map((event) => (
          <li
            key={event.id}
            className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Link href={`/event/${event.id}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
              {event.name}
            </Link>
            <p className="text-gray-500">{new Date(event.start_time).toLocaleString()}</p>
          </li>
        ))}
    </div>

    </ul>
  </div>
  )
}
