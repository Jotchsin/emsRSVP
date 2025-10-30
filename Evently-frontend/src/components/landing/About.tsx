import Manage from "../../assets/management.png";

const About = () => {
  return (
    <section id="about" className="bg-[#c3e6a1] py-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-8 gap-12">
        
        <div className="flex-1 flex justify-center">
          <img
            src={Manage}
            alt="Evently illustration"
            className="w-2/3 sm:w-1/2 md:w-full max-w-md object-contain"
          />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-6">About Evently</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Evently is your all in one platform to create, manage, 
            and track events with ease. Whether you’re hosting a 
            small gathering or a large conference, we help you 
            streamline RSVPs, monitor attendance, and keep everything 
            organized in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
