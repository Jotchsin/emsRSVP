import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCamera } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("user") || "Clark Buyan";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? "border-b-4 border-black pb-1 text-black font-semibold"
      : "hover:border-b-2 border-black pb-1 text-gray-600 hover:text-black transition-all";

  return (
    <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md mb-6 relative z-50">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Evently
      </h1>

      <div className="flex gap-8 items-center">
        <button onClick={() => navigate("/dashboard")} className={isActive("/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => navigate("/create")} className={isActive("/create")}>
          Create
        </button>
        <button onClick={() => navigate("/manage")} className={isActive("/manage")}>
          Manage
        </button>
        <button onClick={() => navigate("/track")} className={isActive("/track")}>
          Track
        </button>

        {/* ✅ New QR Scanner Button */}
        <button
          onClick={() => navigate("/scanner")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
            location.pathname === "/scanner"
              ? "bg-indigo-500 text-white shadow-md"
              : "bg-gray-100 hover:bg-indigo-500 hover:text-white"
          }`}
        >
          <FiCamera />
          <span>QR Scanner</span>
        </button>
      </div>

      <div
        ref={dropdownRef}
        className="flex items-center gap-2 cursor-pointer relative"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="font-semibold hover:text-blue-600 transition-all">
          {userName}
        </span>
        <FiChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />

        {dropdownOpen && (
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-40 z-50">
            <ul className="p-2 space-y-2">
              <li className="cursor-pointer hover:text-blue-600">Edit Profile</li>
              <li className="cursor-pointer hover:text-blue-600">Settings</li>
              <li
                className="cursor-pointer hover:text-red-600"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
