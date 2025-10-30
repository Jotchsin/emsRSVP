import ContactBook from "../../assets/contact-book.png";

const Contacts = () => {
  return (
    <section id="contact" className="bg-[#FDD493] py-20 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions or want to host your next event with Evently? 
            We’d love to hear from you. Fill out the form below or reach us directly.
          </p>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name:"
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-[#fafafa]"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email:"
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-[#fafafa]"
              />
            </div>
            <div>
              <textarea
                placeholder="Message:"
                rows={4}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-[#fafafa]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow-xl/20 hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex justify-center">
          <img
            src={ContactBook}
            alt="Contact illustration"
            className="w-[clamp(10rem,50%,18rem)] max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
