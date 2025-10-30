import { useState, useEffect, useRef } from "react";
import { FiTrash2, FiLink } from "react-icons/fi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DashboardNavbar from "./NavbarInside";

type Event = {
  id: number;
  name: string;
  photo?: string;
  location?: string;
  date?: string;
  time?: string;
  participants?: number[];
  rsvp?: number[];
  finishedAt?: string;
};

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventHistory, setEventHistory] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const eventsRef = useRef<Event[]>([]);
  const historyRef = useRef<Event[]>([]);

  // ✅ Load stored data once
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("publishedEvents") || "[]");
    const storedHistory = JSON.parse(localStorage.getItem("eventHistory") || "[]");
    setEvents(storedEvents);
    setEventHistory(storedHistory);
    eventsRef.current = storedEvents;
    historyRef.current = storedHistory;
  }, []);

  // ✅ Auto-check every minute for finished events
  useEffect(() => {
    const checkAndMoveEvents = () => {
      const now = new Date();
      const updatedEvents = [...eventsRef.current];
      const updatedHistory = [...historyRef.current];

      const stillActive: Event[] = [];
      const newlyFinished: Event[] = [];

      for (const event of updatedEvents) {
        if (event.date && event.time) {
          const eventDateTime = new Date(`${event.date}T${event.time}`);
          if (eventDateTime < now) {
            const alreadyInHistory = updatedHistory.some((h) => h.id === event.id);
            if (!alreadyInHistory) {
              newlyFinished.push({ ...event, finishedAt: new Date().toISOString() });
            }
          } else {
            stillActive.push(event);
          }
        } else {
          stillActive.push(event);
        }
      }

      // ✅ Add new finished events to history
      let newHistory = [...updatedHistory, ...newlyFinished];

      // ✅ Remove finished events older than 2 days
      const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
      newHistory = newHistory.filter((e) => {
        if (!e.finishedAt) return true;
        const finishedTime = new Date(e.finishedAt).getTime();
        return now.getTime() - finishedTime < twoDaysMs;
      });

      // ✅ Update state and localStorage
      if (
        newlyFinished.length > 0 ||
        stillActive.length !== eventsRef.current.length ||
        newHistory.length !== historyRef.current.length
      ) {
        eventsRef.current = stillActive;
        historyRef.current = newHistory;
        setEvents(stillActive);
        setEventHistory(newHistory);
        localStorage.setItem("publishedEvents", JSON.stringify(stillActive));
        localStorage.setItem("eventHistory", JSON.stringify(newHistory));
      }
    };

    // Run immediately on mount
    checkAndMoveEvents();

    // Run every minute
    const interval = setInterval(checkAndMoveEvents, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id: number) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    eventsRef.current = updated;
    localStorage.setItem("publishedEvents", JSON.stringify(updated));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  const handleCopyLink = (id: number) => {
    navigator.clipboard.writeText(`http://localhost:3000/event/${id}`);
    alert("Event link copied!");
  };

  // ✅ Manual Clear History
  const handleClearHistory = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all event history?");
    if (confirmClear) {
      setEventHistory([]);
      historyRef.current = [];
      localStorage.setItem("eventHistory", JSON.stringify([]));
      alert("Event history cleared successfully!");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-teal-300 rounded-full blur-[180px] opacity-40 top-[-100px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] bg-pink-300 rounded-full blur-[180px] opacity-40 top-[200px] left-[300px]" />
        <div className="absolute w-[600px] h-[600px] bg-orange-300 rounded-full blur-[180px] opacity-40 top-[200px] right-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-green-300 rounded-full blur-[180px] opacity-40 bottom-[-100px] right-[100px]" />
      </div>

      <DashboardNavbar />

      <div className="relative p-6">
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 space-y-6">
            {/* === PUBLISHED EVENTS === */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4">
              <h2 className="font-semibold text-lg mb-3">List of Published Events</h2>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {events.length === 0 ? (
                  <p className="text-gray-500">No events published yet.</p>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className={`flex justify-between items-center bg-gray-100 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all ${
                        selectedEvent?.id === event.id ? "border border-black" : ""
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center gap-3">
                        {event.photo ? (
                          <img
                            src={event.photo}
                            alt={event.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                            <span className="text-sm">No Img</span>
                          </div>
                        )}
                        <span className="truncate text-gray-700 font-medium">
                          {event.name || "Untitled"} / {event.location || "—"} /{" "}
                          {event.date || "—"} / {event.time || "—"}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <FiLink
                          className="cursor-pointer hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(event.id);
                          }}
                        />
                        <FiTrash2
                          className="cursor-pointer hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(event.id);
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* === EVENT HISTORY === */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">
                  Event History (Auto-removed after 2 days)
                </h2>

                {eventHistory.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {eventHistory.length === 0 ? (
                <p className="text-gray-500">No past events yet.</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {eventHistory.map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-2"
                    >
                      <div className="flex items-center gap-3">
                        {event.photo ? (
                          <img
                            src={event.photo}
                            alt={event.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                            <span className="text-sm">No Img</span>
                          </div>
                        )}
                        <span className="truncate text-gray-700 font-medium">
                          {event.name || "Untitled"} / {event.location || "—"} /{" "}
                          {event.date || "—"} / {event.time || "—"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* === GRAPHS === */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4 h-64">
              <h2 className="font-semibold text-lg mb-3">Participants Graph</h2>
              {selectedEvent && selectedEvent.participants ? (
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    data={selectedEvent.participants.map((p, i) => ({
                      name: `Day ${i + 1}`,
                      value: p,
                    }))}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center mt-10">
                  Click an event to view graph.
                </p>
              )}
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4 h-64">
              <h2 className="font-semibold text-lg mb-3">RSVP Chart</h2>
              {selectedEvent && selectedEvent.rsvp ? (
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    data={selectedEvent.rsvp.map((r, i) => ({
                      name: `Group ${i + 1}`,
                      value: r,
                    }))}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#EC4899" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center mt-10">
                  Click an event to view RSVP chart.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
