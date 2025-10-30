import Facebook from "../../assets/facebook.png";
import Twitter from "../../assets/x.png";
import Instagram from "../../assets/instagram.png";
import Gmail from "../../assets/gmail-logo.png";

const Footer = () => {
  return (
    <footer className="bg-teal-300 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-2xl font-bold mb-6">Evently</h2>

        <nav className="flex justify-center space-x-8 mb-6">
          <a href="#home" className="hover:text-gray-700">Home</a>
          <a href="#about" className="hover:text-gray-700">About</a>
          <a href="#features" className="hover:text-gray-700">Features</a>
          <a href="#contacts" className="hover:text-gray-700">Contacts</a>
        </nav>

        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:opacity-70">
            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="#" className="hover:opacity-70">
            <img src={Twitter} alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="#" className="hover:opacity-70">
            <img src={Instagram} alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="#" className="hover:opacity-70">
            <img src={Gmail} alt="Gmail" className="w-6 h-6" />
          </a>
        </div>

        <p className="text-sm text-gray-700">
          Copyright ©2025 All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
