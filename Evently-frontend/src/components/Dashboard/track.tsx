import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import DashboardNavbar from "./NavbarInside";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Attendee = {
  name: string;
  email: string;
  status: "Present" | "Absent";
};

type Respondent = {
  email: string;
  response: "Yes" | "No";
};

type Event = {
  id: number;
  name: string;
  location?: string;
  date?: string;
  time?: string;
  participants?: number[];
  rsvp?: number[];
  attendees?: Attendee[];
  respondents?: Respondent[];
};

export default function TrackPage() {
  const [openEvent, setOpenEvent] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showList, setShowList] = useState<number | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("publishedEvents") || "[]");
    const withMockData = storedEvents.map((e: Event) => ({
      ...e,
      attendees:
        e.attendees ||
        [
          { name: "John Doe", email: "john@example.com", status: "Present" },
          { name: "Jane Smith", email: "jane@example.com", status: "Present" },
          { name: "Carlos Reyes", email: "carlos@example.com", status: "Absent" },
        ],
      respondents:
        e.respondents ||
        [
          { email: "clarkbuyan@gmail.com", response: "Yes" },
          { email: "genntimtim@gmail.com", response: "No" },
          { email: "jMccaslin@gmail.com", response: "Yes" },
        ],
    }));
    setEvents(withMockData);
  }, []);

  const toggleEvent = (eventId: number) => {
    setOpenEvent(openEvent === eventId ? null : eventId);
  };

  const handleShowList = (eventId: number) => {
    setShowList(showList === eventId ? null : eventId);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-teal-300 rounded-full blur-[180px] opacity-40 top-[-100px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] bg-pink-300 rounded-full blur-[180px] opacity-40 top-[200px] left-[300px]" />
        <div className="absolute w-[600px] h-[600px] bg-orange-300 rounded-full blur-[180px] opacity-40 top-[200px] right-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-green-300 rounded-full blur-[180px] opacity-40 bottom-[-100px] right-[100px]" />
      </div>

      <DashboardNavbar />

      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-5xl">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            📊 Event Tracking
          </h1>

          {events.length === 0 ? (
            <p className="text-gray-600 text-center bg-white/70 p-4 rounded-xl shadow-md">
              No published events yet. Publish an event from your Dashboard to see it here.
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl mb-6 p-5 border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {event.name || "Untitled Event"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {event.location || "Unknown location"} —{" "}
                      {event.date || "No date"} at {event.time || "No time"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="bg-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full hover:bg-pink-600 transition"
                      onClick={handlePrint}
                    >
                      Print
                    </button>
                    <button
                      onClick={() => toggleEvent(event.id)}
                      className="text-gray-600 hover:text-gray-800 transition"
                    >
                      {openEvent === event.id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>
                </div>

                {openEvent === event.id && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-auto bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                        <h3 className="text-sm text-gray-700 font-semibold mb-2">
                          Attendance Graph
                        </h3>
                        {event.participants && event.participants.length > 0 ? (
                          <>
                            <ResponsiveContainer width="90%" height={180}>
                              <BarChart
                                data={event.participants.map((p, i) => ({
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
                            <button
                              onClick={() => handleShowList(event.id)}
                              className="mt-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-1 transition"
                            >
                              {showList === event.id ? "Hide List" : "Show List"}
                            </button>
                          </>
                        ) : (
                          <p className="text-gray-500 text-sm">No attendance data yet.</p>
                        )}
                      </div>

                      <div className="h-48 bg-gray-100 rounded-lg flex flex-col justify-center items-center">
                        <h3 className="text-sm text-gray-700 font-semibold mb-2">
                          RSVP (Yes/No)
                        </h3>
                        {event.rsvp && event.rsvp.length > 0 ? (
                          <ResponsiveContainer width="90%" height="70%">
                            <BarChart
                              data={event.rsvp.map((r, i) => ({
                                name: i === 0 ? "Yes" : "No",
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
                          <p className="text-gray-500 text-sm">No RSVP data yet.</p>
                        )}
                      </div>
                    </div>

                    {showList === event.id && (
                      <div
                        ref={printRef}
                        className="mt-4 bg-white rounded-xl shadow p-4 border border-gray-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          🧾 Attendee List
                        </h3>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                              <th className="p-2 text-left border-b">Name</th>
                              <th className="p-2 text-left border-b">Email</th>
                              <th className="p-2 text-left border-b">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {event.attendees?.map((a, i) => (
                              <tr key={i} className="text-sm text-gray-700">
                                <td className="p-2 border-b">{a.name}</td>
                                <td className="p-2 border-b">{a.email}</td>
                                <td
                                  className={`p-2 border-b font-medium ${
                                    a.status === "Present" ? "text-green-600" : "text-red-500"
                                  }`}
                                >
                                  {a.status}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="h-auto bg-gray-100 rounded-lg p-4">
                      <h3 className="text-sm text-gray-700 font-semibold mb-2">
                        List of Respondents (Yes / No)
                      </h3>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-600 text-sm">
                            <th className="p-2 text-left border-b">Email</th>
                            <th className="p-2 text-left border-b">Response</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.respondents?.map((r, i) => (
                            <tr key={i} className="text-sm text-gray-700">
                              <td className="p-2 border-b">{r.email}</td>
                              <td
                                className={`p-2 border-b font-medium ${
                                  r.response === "Yes" ? "text-green-600" : "text-red-500"
                                }`}
                              >
                                {r.response}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
