import Business from "../../assets/business.png";
import Birthday from "../../assets/birthday-gifts.png";
import Eventone from "../../assets/events-1.png";
import Event from "../../assets/events.png";
import { Link } from "react-router-dom";

const FirstPart = () => {
  return (
    <section
      id="home"
      className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-gradient-to-r from-[#d9f3f1] via-[#f5e6f5] to-[#fce9d2] px-4 sm:px-8 lg:px-16 gap-8"
    >
      <div className="flex-1 text-center lg:text-left">
        <h2 className="font-bold leading-tight text-[clamp(1.5rem,4vw,3.5rem)]">
          Seamless Event <br /> Creation <br /> Smarter Management
        </h2>
        <h3 className="mt-4 text-gray-600 text-[clamp(0.9rem,2vw,1.25rem)] max-w-[90%] mx-auto lg:mx-0">
          Your all in one hub to effortlessly create events, manage every detail,
          and track attendance in real time.
        </h3>

        <div className="mt-6 flex gap-3 flex-wrap justify-center lg:justify-start">
          <Link
            to="/login"
            className="bg-white px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition text-[clamp(0.8rem,1.5vw,1rem)]"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 justify-items-center">
        <img
          src={Business}
          alt="Business meeting"
          className="rounded-2xl shadow-lg w-[clamp(6rem,20vw,16rem)] h-[clamp(6rem,20vw,16rem)] object-cover"
        />
        <img
          src={Birthday}
          alt="Birthday gifts"
          className="rounded-2xl shadow-lg w-[clamp(6rem,20vw,16rem)] h-[clamp(6rem,20vw,16rem)] object-cover"
        />
        <img
          src={Eventone}
          alt="Event card"
          className="rounded-2xl shadow-lg w-[clamp(6rem,20vw,16rem)] h-[clamp(6rem,20vw,16rem)] object-cover"
        />
        <img
          src={Event}
          alt="Conference hall"
          className="rounded-2xl shadow-lg w-[clamp(6rem,20vw,16rem)] h-[clamp(6rem,20vw,16rem)] object-cover"
        />
      </div>
    </section>
  );
};

export default FirstPart;
