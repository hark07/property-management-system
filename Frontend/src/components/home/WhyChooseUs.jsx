import { FaShieldAlt, FaHome, FaUsers, FaClock } from "react-icons/fa";

const features = [
  {
    icon: <FaHome />,
    title: "Wide Property Choice",
    text: "Find different types of properties according to your needs.",
  },

  {
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    text: "Safe and reliable property management system.",
  },

  {
    icon: <FaUsers />,
    title: "Trusted Users",
    text: "Connect with verified owners and tenants.",
  },

  {
    icon: <FaClock />,
    title: "Easy Management",
    text: "Manage bookings and requests quickly.",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="
        py-16
        bg-gray-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
        "
      >
        <div
          className="
            text-center
            mb-10
          "
        >
          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Why Choose Us
          </h2>

          <p
            className="
              text-gray-500
              mt-3
            "
          >
            Everything you need for property management
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {features.map((item, index) => (
            <div
              key={index}
              className="
                  bg-white
                  rounded-xl
                  shadow
                  p-6
                  text-center
                  hover:shadow-lg
                  transition
                "
            >
              <div
                className="
                    text-4xl
                    text-blue-600
                    flex
                    justify-center
                    mb-4
                  "
              >
                {item.icon}
              </div>

              <h3
                className="
                    font-bold
                    text-xl
                  "
              >
                {item.title}
              </h3>

              <p
                className="
                    text-gray-500
                    mt-3
                    text-sm
                  "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
