import {
  FaBuilding,
  FaUsers,
  FaHome,
  FaHandshake,
  FaShieldAlt,
  FaClock,
  FaMapMarkedAlt,
  FaAward,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    {
      id: 1,
      icon: <FaHome />,
      value: "500+",
      title: "Properties Listed",
    },
    {
      id: 2,
      icon: <FaUsers />,
      value: "2,500+",
      title: "Happy Customers",
    },
    {
      id: 3,
      icon: <FaBuilding />,
      value: "100+",
      title: "Property Owners",
    },
    {
      id: 4,
      icon: <FaHandshake />,
      value: "1,200+",
      title: "Successful Bookings",
    },
  ];

  const features = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description:
        "Your personal information and bookings are protected with secure authentication and reliable technology.",
    },
    {
      id: 2,
      icon: <FaClock />,
      title: "Real Time Booking",
      description:
        "Book rental properties instantly with live availability and quick confirmation.",
    },
    {
      id: 3,
      icon: <FaMapMarkedAlt />,
      title: "Verified Properties",
      description:
        "Browse genuine rental properties with accurate details and trusted listings.",
    },
    {
      id: 4,
      icon: <FaAward />,
      title: "Quality Service",
      description:
        "We focus on delivering a smooth experience for tenants, owners, and administrators.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}

      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              About PropertyHub
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-gray-300 text-lg leading-8">
              PropertyHub is a modern property rental management platform
              designed to simplify the way people search, book, and manage
              rental properties. We connect tenants and property owners through
              a secure and user friendly system.
            </p>

            <Link
              to="/properties"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                bg-white
                text-slate-900
                px-6
                py-3
                rounded-lg
                font-semibold
                hover:bg-gray-200
                transition
              "
            >
              Explore Properties
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold uppercase">
              Who We Are
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-3">
              Smart Property Management Made Easy
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              PropertyHub provides a complete solution for managing rental
              properties online. Users can browse available properties, submit
              booking requests, manage maintenance, and reserve amenities from
              one platform.
            </p>

            <p className="text-gray-600 mt-5 leading-8">
              Our mission is to simplify property management with secure
              technology, transparent communication, and an intuitive user
              experience for tenants, landlords, and administrators.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900"
              alt="Property Management"
              className="
                w-full
                rounded-2xl
                shadow-xl
                object-cover
              "
            />
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.id}
                className="
                  bg-gray-50
                  rounded-xl
                  shadow-sm
                  p-8
                  text-center
                  hover:shadow-lg
                  transition
                "
              >
                <div className="text-4xl text-blue-600 flex justify-center mb-4">
                  {item.icon}
                </div>

                <h3 className="text-3xl font-bold text-gray-800">
                  {item.value}
                </h3>

                <p className="text-gray-500 mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Our Mission & Vision
            </h2>

            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              We aim to simplify property rental management through modern
              technology, secure services, and an exceptional user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-8
                hover:shadow-xl
                transition
              "
            >
              <div className="text-blue-600 text-5xl mb-5">
                <FaHandshake />
              </div>

              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>

              <p className="text-gray-600 mt-5 leading-8">
                Our mission is to provide a secure, reliable, and user friendly
                property rental platform where tenants can easily find homes,
                property owners can manage listings efficiently, and
                administrators can oversee every operation from one centralized
                dashboard.
              </p>
            </div>

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-8
                hover:shadow-xl
                transition
              "
            >
              <div className="text-green-600 text-5xl mb-5">
                <FaAward />
              </div>

              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>

              <p className="text-gray-600 mt-5 leading-8">
                We envision becoming one of the most trusted online property
                management platforms by delivering innovative solutions,
                transparent services, and seamless digital experiences for
                property owners and renters worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose PropertyHub
            </h2>

            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              We combine modern technology with reliable property management
              services to deliver the best experience for every user.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="
                  bg-gray-50
                  rounded-2xl
                  p-8
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <div className="text-5xl text-blue-600 mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Find Your Perfect Property Today
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-300 leading-8 text-lg">
            Whether you are searching for a rental home, apartment, office, or
            commercial space, PropertyHub makes the entire process simple,
            secure, and convenient.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-5
            "
          >
            <Link
              to="/properties"
              className="
                bg-blue-600
                hover:bg-blue-700
                px-8
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Browse Properties
            </Link>

            <Link
              to="/contact"
              className="
                border
                border-white
                hover:bg-white
                hover:text-slate-900
                px-8
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
