import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        bg-slate-900
        text-white
        mt-10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          py-12
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            PropertyHub
          </h2>

          <p
            className="
              text-gray-400
              mt-4
            "
          >
            Complete property rental management solution.
          </p>
        </div>

        <div>
          <h3
            className="
              font-bold
              mb-4
            "
          >
            Quick Links
          </h3>

          <p>Home</p>
          <p>Properties</p>
          <p>About</p>
          <p>Contact</p>
        </div>

        <div>
          <h3
            className="
              font-bold
              mb-4
            "
          >
            Follow Us
          </h3>

          <div
            className="
              flex
              gap-5
              text-2xl
            "
          >
            <FaFacebook />

            <FaInstagram />

            <FaTwitter />
          </div>
        </div>
      </div>

      <div
        className="
          border-t
          border-gray-700
          text-center
          py-4
          text-gray-400
        "
      >
        © 2026 PropertyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
