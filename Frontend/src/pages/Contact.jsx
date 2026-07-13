import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Your message has been sent successfully.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}

      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-8">
            We'd love to hear from you. Whether you have a question, feedback,
            or need support, our team is here to help you.
          </p>
        </div>
      </section>

      {/* Contact Information */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl text-blue-600 flex justify-center mb-4">
              <FaPhoneAlt />
            </div>

            <h3 className="text-xl font-bold mb-2">Phone</h3>

            <p className="text-gray-600">+977 9800000000</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl text-green-600 flex justify-center mb-4">
              <FaEnvelope />
            </div>

            <h3 className="text-xl font-bold mb-2">Email</h3>

            <p className="text-gray-600">support@propertyhub.com</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl text-red-500 flex justify-center mb-4">
              <FaMapMarkerAlt />
            </div>

            <h3 className="text-xl font-bold mb-2">Address</h3>

            <p className="text-gray-600">Kathmandu, Nepal</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl text-yellow-500 flex justify-center mb-4">
              <FaClock />
            </div>

            <h3 className="text-xl font-bold mb-2">Working Hours</h3>

            <p className="text-gray-600">Sun to Fri</p>

            <p className="text-gray-600">9:00 AM to 6:00 PM</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Contact Details */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Send Us a Message
              </h2>

              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                      className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                    className="
                      w-full
                      border
                      rounded-lg
                      px-4
                      py-3
                      resize-none
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-8
                    py-3
                    rounded-lg
                    font-semibold
                    transition
                  "
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}

            <div className="bg-slate-900 text-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>

              <p className="text-gray-300 leading-8 mb-10">
                Have questions about property rentals, bookings, maintenance, or
                amenities? Contact our support team and we'll be happy to assist
                you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-2xl text-blue-400 mt-1" />

                  <div>
                    <h3 className="font-semibold text-lg">Office Address</h3>

                    <p className="text-gray-300 mt-1">Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaPhoneAlt className="text-2xl text-green-400 mt-1" />

                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>

                    <p className="text-gray-300 mt-1">+977 9800000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-2xl text-red-400 mt-1" />

                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>

                    <p className="text-gray-300 mt-1">
                      support@propertyhub.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaClock className="text-2xl text-yellow-400 mt-1" />

                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>

                    <p className="text-gray-300 mt-1">Sunday to Friday</p>

                    <p className="text-gray-300">9:00 AM to 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              title="PropertyHub Location"
              src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              allowFullScreen
              className="border-0"
            />
          </div>
        </div>
      </section>

      {/* Social Media */}

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Follow PropertyHub</h2>

          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Stay connected with us for the latest property listings,
            announcements, updates, and rental tips.
          </p>

          <div className="flex justify-center gap-6 mt-10">
            <a
              href="#"
              className="
                w-14
                h-14
                rounded-full
                bg-blue-600
                flex
                items-center
                justify-center
                text-2xl
                hover:scale-110
                transition
              "
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="
                w-14
                h-14
                rounded-full
                bg-pink-600
                flex
                items-center
                justify-center
                text-2xl
                hover:scale-110
                transition
              "
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="
                w-14
                h-14
                rounded-full
                bg-sky-500
                flex
                items-center
                justify-center
                text-2xl
                hover:scale-110
                transition
              "
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="
                w-14
                h-14
                rounded-full
                bg-blue-800
                flex
                items-center
                justify-center
                text-2xl
                hover:scale-110
                transition
              "
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
