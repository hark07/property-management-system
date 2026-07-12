import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section
      className="
        py-16
        bg-white
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          items-center
        "
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
            alt="Property"
            className="
              rounded-2xl
              shadow-lg
              w-full
              h-[420px]
              object-cover
            "
          />
        </div>

        <div>
          <p
            className="
              text-blue-600
              font-semibold
              uppercase
            "
          >
            About Us
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            Making Property Management Simple
          </h2>

          <p
            className="
              text-gray-600
              mt-5
              leading-7
            "
          >
            Our platform helps tenants, owners and administrators manage
            properties easily. Search properties, manage bookings, handle
            maintenance requests and connect with users from one place.
          </p>

          <p
            className="
              text-gray-600
              mt-4
              leading-7
            "
          >
            We provide a simple and secure solution for modern property rental
            management.
          </p>

          <Link
            to="/about"
            className="
              inline-block
              mt-6
              bg-blue-600
              text-white
              px-7
              py-3
              rounded-lg
            "
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
