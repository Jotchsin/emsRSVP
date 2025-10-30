import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/landing/NavBar";
import FirstPart from "./components/landing/FirstPart";
import Benefits from "./components/landing/Benefits";
import About from "./components/landing/About";
import Features from "./components/landing/Features";
import Contacts from "./components/landing/Contacts";
import Footer from "./components/landing/Footer";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Dashboard from "./components/Dashboard/dashboard";
import CreateEvent from "./components/Dashboard/Create";
import DashboardNavbar from "./components/Dashboard/NavbarInside";
import ManageEvent from "./components/Dashboard/manage";
import TrackEvent from "./components/Dashboard/track";
import ScannerEvent from "./components/Dashboard/qrscanner"

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="px-8 py-6">
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <FirstPart />
              <Benefits />
              <About />
              <Features />
              <Contacts />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/manage" element={<ManageEvent />} />
          <Route path="/track" element={<TrackEvent />} />
          <Route path="/qrscanner" element={<ScannerEvent />} />
          
      </Routes>
    </div>
  );
};

export default App;
