"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";

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

const EventPage = () => {
  const [event, setEvent] = useState<TEvent | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const { id } = useParams(); // Get the dynamic id from the URL

  useEffect(() => {
    if (id) {
      // Fetch the specific event based on the ID from the URL
      fetch(`${API_URL}/${id}`)
        .then((response) => response.json())
        .then((data: TEvent) => {
          setEvent(data);

          // Fetch related events
          const relatedEventPromises = data.related_events.map((relatedId) =>
            fetch(`${API_URL}/${relatedId}`).then((res) => res.json())
          );

          Promise.all(relatedEventPromises).then((relatedData) => {
            setRelatedEvents(relatedData);
          });
        })
        .catch((error) => console.error("Error fetching event data:", error));
    }
  }, [id]);

  if (!event) return <div className="container mx-auto px-6 py-8 text-white">Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
      <div className="container mx-auto px-6 py-8">
        {/* Home Icon Button */}
        <Link href="/" passHref>
          <button className="flex items-center justify-center mt-[4rem] mb-5 text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
            <HiArrowLeft className="h-6 w-6" />
          </button>
        </Link>

        {/* Event Title */}
        <h1 className="text-3xl font-semibold text-purple-300">{event.name}</h1>
        
        {/* Start and End Time */}
        <p className="text-gray-300 mt-4">
          <span className="font-semibold text-white">
            {new Date(event.start_time).toLocaleString([], {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="font-semibold text-white">
            {new Date(event.start_time).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })} - 
            {new Date(event.end_time).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </p>

        {/* Event Description */}
        <p className="text-gray-300 mt-2">{event.description}</p>

        {/* Speakers List */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-purple-200">Speakers:</h2>
          <ul className="space-y-2">
            {event.speakers.map((speaker, index) => (
              <li key={index} className="text-gray-300">{speaker.name}</li>
            ))}
          </ul>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-purple-200 mb-2">Related Events:</h3>
            <ul className="flex gap-5">
              {relatedEvents.map((relatedEvent) => (
                <li key={relatedEvent.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 w-[25rem] hover:scale-105 transition-transform">
            <Link href={`/event/${relatedEvent.id}`} passHref>
              <p className="text-purple-300 hover:text-purple-400 text-lg font-semibold">
                {relatedEvent.name}
              </p>
              <p className="text-gray-300 text-sm">
                {/* Display start time */}
                {new Date(relatedEvent.start_time).toLocaleString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
                })}{" "}
                |{" "}
                {/* Display start time in hours and minutes */}
                {new Date(relatedEvent.start_time).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                -{" "}
                {/* Display end time in hours and minutes */}
                {new Date(relatedEvent.end_time).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </Link>

                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
