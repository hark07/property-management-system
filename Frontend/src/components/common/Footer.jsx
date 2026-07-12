import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          py-12
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10
        "
      >
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-bold text-white">PropertyHub</h2>

          <p className="text-gray-400 mt-4 leading-6">
            A complete property rental management platform that helps users
            find, book, and manage properties easily.
          </p>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-sky-500 transition">
              <FaTwitter />
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>

            <a href="#" className="hover:text-gray-300 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li>
              <a href="/properties" className="hover:text-white transition">
                Properties
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-5">Services</h3>

          <ul className="space-y-3 text-gray-400">
            <li>Property Rental</li>

            <li>Property Management</li>

            <li>Online Booking</li>

            <li>Maintenance Support</li>

            <li>Amenity Management</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-5">Contact Us</h3>

          <div className="space-y-4 text-gray-400">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-white" />
              Kathmandu, Nepal
            </p>

            <p className="flex items-center gap-3">
              <FaPhone className="text-white" />
              +977 9800000000
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-white" />
              support@propertyhub.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div
        className="
          border-t
          border-gray-700
          py-5
          px-5
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          text-gray-400
          text-sm
          gap-3
        "
      >
        <p>© 2026 PropertyHub. All rights reserved.</p>

        <div className="flex gap-5">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-white">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
