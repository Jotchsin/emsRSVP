import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-sm fixed top-0 left-0 right-0 bg-white z-50">
      <div className="flex justify-between items-center py-5 px-6 md:px-12 text-gray-700">
        <a
          href="#home"
          className="font-mono tracking-wider font-bold text-2xl"
        >
          Evently
        </a>

        <div className="hidden md:flex gap-8">
          <a
            href="#home"
            className="font-medium hover:border-b hover:border-gray-500 transition"
          >
            Home
          </a>
          <a
            href="#about"
            className="font-medium hover:border-b hover:border-gray-500 transition"
          >
            About
          </a>
          <a
            href="#features"
            className="font-medium hover:border-b hover:border-gray-500 transition"
          >
            Features
          </a>
          <a
            href="#contact"
            className="font-medium hover:border-b hover:border-gray-500 transition"
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-6">
          <a
            href="#home"
            className="font-medium hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="font-medium hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#features"
            className="font-medium hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#contact"
            className="font-medium hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
