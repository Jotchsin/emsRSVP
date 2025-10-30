import Create from "../../assets/createpart.png";
import Manage from "../../assets/task-management.png";
import Track from "../../assets/track.png";
import Rsvp from "../../assets/rsvp.png";

const Features = () => {
  const features = [
    {
      icon: Create,
      title: "Create Events",
      desc: "Creating an event with Evently is simple: just add your event details, customize the setup to match your style, and publish it so guests can join and stay updated.",
    },
    {
      icon: Manage,
      title: "Manage Events",
      desc: "Effortlessly manage your event with tools to organize guest lists, send updates, handle schedules, and keep everything running smoothly in one place.",
    },
    {
      icon: Track,
      title: "Track Events",
      desc: "Stay on top of your event with real-time attendance tracking: monitor who’s coming, check in guests easily, and keep accurate records with no hassle.",
    },
    {
      icon: Rsvp,
      title: "RSVP System",
      desc: "Simplify guest responses with our built-in RSVP system: send invitations, receive confirmations instantly, and keep your guest list organized without the stress.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-gray-500">
            Features
          </h4>
          <h2 className="text-4xl font-bold mt-2">Everything You Looking For</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Evently, we built powerful yet simple features to help you manage every kind of event with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-6">
              <img
                src={item.icon}
                alt={item.title}
                className="w-24 h-24 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
