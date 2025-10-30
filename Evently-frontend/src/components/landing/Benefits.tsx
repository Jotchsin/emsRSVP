import Time from '../../assets/time.png';
import Rocket from '../../assets/rocket.png';
import Smile from '../../assets/smile.png';
import Check from '../../assets/check.png';

const Benefits = () => {
  const benefits = [
    {
      icon: Time,
      title: "Save Time",
      desc: "Automate RSVPs & reminders.",
    },
    {
      icon: Rocket,
      title: "Boost Attendance",
      desc: "Smart tracking & follow-ups.",
    },
    {
      icon: Smile,
      title: "Better Experience",
      desc: "Easy RSVP & updates for guests.",
    },
    {
      icon: Check,
      title: "Easy to Create Events",
      desc: "Set up events in minutes.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {benefits.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.icon}
              alt={item.title}
              className="w-16 h-16 mb-4 object-contain"
            />
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
