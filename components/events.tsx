"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

interface EventsProps {
  loggedIn: boolean;
}

export default function Events({ loggedIn }: EventsProps) {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<TEventType | "all">("all");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: TEvent[]) => {
        const sortedEvents = data.sort((a, b) => a.start_time - b.start_time);
        setEvents(sortedEvents);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Event type filter handler
  const handleEventTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventType(event.target.value as TEventType | "all");
  };

  // Filter events based on event type
  const filteredEvents =
    selectedEventType === "all"
      ? events
      : events.filter((event) => event.event_type === selectedEventType);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Event Type Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="event-type" className="text-white font-semibold mr-2">
          Filter by Event Type:
        </label>
        <select
          id="event-type"
          value={selectedEventType}
          onChange={handleEventTypeChange}
          className="bg-gray-800 text-white rounded-lg p-2"
        >
          <option value="all">All Events</option>
          <option value="workshop">Workshop</option>
          <option value="activity">Activity</option>
          <option value="tech_talk">Tech Talk</option>
        </select>
      </div>

      {/* Display Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents
          .filter((event) => loggedIn || event.permission !== "private")
          .map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform"
            >
              <Link
                href={`/event/${event.id}`}
                passHref
                className="block text-xl font-semibold text-purple-300 hover:text-purple-400 transition-colors"
              >
                {event.name}
              </Link>
              <p className="text-gray-300 mt-2 text-sm flex items-center gap-4">
                <span className="flex items-center gap-1 text-blue-500">
                  <span className="font-semibold text-white">
                    {new Date(event.start_time).toLocaleString([], {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </span>
                <span className="text-white">|</span>
                <span className="text-gray-400">
                  {new Date(event.start_time).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {new Date(event.end_time).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </p>
              {/* Description Preview */}
              {event.description && (
                <p className="text-gray-300 mt-4 text-sm">
                  {event.description.length > 100
                    ? `${event.description.substring(0, 100)}...`
                    : event.description}
                </p>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
