import React, { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Upload, Globe } from "lucide-react";
import DashboardNavbar from "./NavbarInside";

const CreateEvent: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("1 Hour");
  const [capacity, setCapacity] = useState("");
  const [eventType, setEventType] = useState("Business");
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!eventName.trim()) {
      alert("⚠️ Please enter an event name before creating!");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName,
      location,
      date,
      time,
      duration,
      capacity,
      eventType,
      isPublic,
      description,
      photo,
    };

    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

    const updatedEvents = [...existingEvents, newEvent];

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    alert(`✅ Event "${eventName}" created successfully!`);

    navigate("/manage");
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

      <div className="relative z-10 flex flex-col items-center py-10 px-6">
        <div className="w-full max-w-5xl bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center w-full md:w-1/3">
            <label className="text-gray-700 mb-3 font-medium">
              Add Event Photo
            </label>
            <div className="w-full aspect-square rounded-3xl border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">
              {photo ? (
                <img
                  src={photo}
                  alt="Event"
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <Upload size={40} className="text-gray-500 mb-1" />
                  <p className="text-sm text-gray-400">Upload Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Event Name
              </label>
              <input
                type="text"
                placeholder="Enter your event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-500 cursor-pointer hover:text-pink-500 transition"
                  size={18}
                  onClick={() => locationRef.current?.focus()}
                />
                <input
                  ref={locationRef}
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-md p-2 pl-9 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-pink-500 transition"
                    onClick={() => dateRef.current?.showPicker?.()}
                  />
                  <input
                    ref={dateRef}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Time
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-pink-500 transition"
                    onClick={() => timeRef.current?.showPicker?.()}
                  />
                  <input
                    ref={timeRef}
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option>1 Hour</option>
                  <option>2 Hours</option>
                  <option>3 Hours</option>
                  <option>Half Day</option>
                  <option>Full Day</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  placeholder="Number of attendees"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Event Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option>Business</option>
                  <option>School</option>
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Sports</option>
                  <option>Festival</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Visibility
                </label>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`flex items-center justify-center gap-2 w-full border rounded-md p-2 shadow-sm transition-all ${
                    isPublic
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-400 border-red-300"
                  }`}
                >
                  <Globe size={18} />
                  {isPublic ? "Public" : "Private"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mt-6">
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write event details here..."
            className="w-full border rounded-3xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 bg-pink-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-pink-600 transition font-semibold"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
