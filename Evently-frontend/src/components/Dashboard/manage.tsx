import React, { useState, useEffect } from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";
import DashboardNavbar from "./NavbarInside";

interface Event {
  id: number;
  name: string;
  photo?: string;
  location?: string;
  date?: string;
  time?: string;
  duration?: string;
  capacity?: string;
  type?: string;
  visibility?: string;
  description?: string;
}

const ManageEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(storedEvents);
  }, []);

  const handleSelect = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleConfirmEdit = () => {
    if (!selectedEvent) return;
    const updatedEvents = events.map((e) =>
      e.id === selectedEvent.id ? selectedEvent : e
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setIsEditing(false);

    setPopupMessage("✅ Changes Saved!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleChange = (field: keyof Event, value: string) => {
    if (selectedEvent) {
      setSelectedEvent({ ...selectedEvent, [field]: value });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("photo", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    if (!selectedEvent) return;
    const publishedEvents = JSON.parse(
      localStorage.getItem("publishedEvents") || "[]"
    );

    const alreadyPublished = publishedEvents.some(
      (e: Event) => e.id === selectedEvent.id
    );

    if (!alreadyPublished) {
      publishedEvents.push(selectedEvent);
      localStorage.setItem("publishedEvents", JSON.stringify(publishedEvents));
    }

    setPopupMessage("🚀 Event Published to Dashboard!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
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

      <div className="relative z-10 flex flex-col items-center py-10 px-6">
        <div className="w-full max-w-6xl bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Event List
              </h2>
              <div className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-3 overflow-y-auto h-[400px]">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className={`flex justify-between items-center bg-white rounded-full px-4 py-2 shadow-sm cursor-pointer transition-all ${
                        selectedEvent?.id === event.id
                          ? "bg-pink-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelect(event)}
                    >
                      <div className="flex items-center gap-3">
                        {event.photo ? (
                          <img
                            src={event.photo}
                            alt={event.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <span className="truncate">{event.name}</span>
                      </div>
                      <Trash2
                        className="w-4 h-4 text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(event.id);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center">
                    No events available.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full shadow-md transition"
                onClick={handlePublish}
                disabled={!selectedEvent}
              >
                Publish
              </button>
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition"
                onClick={handleEditToggle}
                disabled={!selectedEvent}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white/90 rounded-3xl shadow-lg p-8">
            {selectedEvent ? (
              <>
                <h2 className="text-lg font-semibold text-gray-700 mb-6">
                  {isEditing
                    ? `Editing "${selectedEvent.name}"`
                    : `Viewing "${selectedEvent.name}"`}
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Photo
                    </label>
                    <div className="relative w-full h-48 bg-gray-100 rounded-2xl shadow-inner overflow-hidden">
                      {selectedEvent.photo ? (
                        <img
                          src={selectedEvent.photo}
                          alt="Event"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <p>No photo available</p>
                        </div>
                      )}
                      {isEditing && (
                        <label className="absolute inset-0 bg-black/40 hover:bg-black/50 text-white flex items-center justify-center cursor-pointer transition">
                          <span>Change Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                    />

                    <label className="block text-sm font-medium mt-4 mb-1 text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.location || ""}
                      onChange={(e) => handleChange("location", e.target.value)}
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                    />

                    <label className="block text-sm font-medium mt-4 mb-1 text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedEvent.date || ""}
                      onChange={(e) => handleChange("date", e.target.value)}
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                    />

                    <label className="block text-sm font-medium mt-4 mb-1 text-gray-700">
                      Time
                    </label>
                    <input
                      type="time"
                      value={selectedEvent.time || ""}
                      onChange={(e) => handleChange("time", e.target.value)}
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.duration || ""}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                    />

                    <label className="block text-sm font-medium mt-4 mb-1 text-gray-700">
                      Capacity
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.capacity || ""}
                      onChange={(e) => handleChange("capacity", e.target.value)}
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
                    />

                    <label className="block text-sm font-medium mt-4 mb-1 text-gray-700">
                      Type
                    </label>
                    {isEditing ? (
                      <select
                        value={selectedEvent.type || "Other"}
                        onChange={(e) => handleChange("type", e.target.value)}
                        className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none bg-white"
                      >
                        <option value="Business">💼 Business</option>
                        <option value="School">🏫 School</option>
                        <option value="Birthday">🎂 Birthday</option>
                        <option value="Wedding">💍 Wedding</option>
                        <option value="Sports">🏆 Sports</option>
                        <option value="Festival">🎉 Festival</option>
                        <option value="Other">✨ Other</option>
                      </select>
                    ) : (
                      <div
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                          selectedEvent.type === "Business"
                            ? "bg-blue-100 text-blue-700"
                            : selectedEvent.type === "School"
                            ? "bg-yellow-100 text-yellow-700"
                            : selectedEvent.type === "Birthday"
                            ? "bg-pink-100 text-pink-700"
                            : selectedEvent.type === "Wedding"
                            ? "bg-purple-100 text-purple-700"
                            : selectedEvent.type === "Sports"
                            ? "bg-green-100 text-green-700"
                            : selectedEvent.type === "Festival"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {selectedEvent.type || "Other"}
                      </div>
                    )}

                    <label className="block text-sm font-medium mt-4 mb-1 text-gray-700">
                      Visibility
                    </label>
                    {isEditing ? (
                      <select
                        value={selectedEvent.visibility || "Public"}
                        onChange={(e) =>
                          handleChange("visibility", e.target.value)
                        }
                        className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none bg-white"
                      >
                        <option value="Public">🌍 Public</option>
                        <option value="Private">🔒 Private</option>
                      </select>
                    ) : (
                      <div
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                          selectedEvent.visibility === "Public"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-red-100 text-red-400 border-red-300"
                        }`}
                      >
                        {selectedEvent.visibility === "Public" ? (
                          <>
                            <span role="img" aria-label="public">
                              🌍
                            </span>
                            Public
                          </>
                        ) : (
                          <>
                            <span role="img" aria-label="private">
                              🔒
                            </span>
                            Private
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={selectedEvent.description || ""}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none h-28"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleConfirmEdit}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-full shadow-md transition font-semibold"
                    >
                      Confirm Edit
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center mt-12">
                Select an event to view details.
              </p>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-2xl shadow-xl px-10 py-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {popupMessage}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvent;
