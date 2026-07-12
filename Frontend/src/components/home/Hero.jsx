import { Link } from "react-router-dom";
import { FaSearch, FaHome, FaBuilding } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      className="
        relative
        min-h-[650px]
        flex
        items-center
        bg-cover
        bg-center
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      ></div>

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-5
          w-full
        "
      >
        <div
          className="
            max-w-3xl
            text-white
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-white/20
              backdrop-blur
              px-4
              py-2
              rounded-full
              text-sm
            "
          >
            <FaHome />
            Find Your Perfect Home
          </span>

          <h1
            className="
              mt-6
              text-4xl
              md:text-6xl
              font-bold
              leading-tight
            "
          >
            Discover Your Dream
            <span className="text-blue-400"> Property</span>
          </h1>

          <p
            className="
              mt-5
              text-lg
              text-gray-200
              max-w-xl
            "
          >
            Find apartments, houses and commercial properties with trusted
            owners and simple booking process.
          </p>

          <div
            className="
              mt-8
              flex
              gap-4
              flex-wrap
            "
          >
            <Link
              to="/properties"
              className="
                bg-blue-600
                hover:bg-blue-700
                px-7
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Browse Properties
            </Link>

            <Link
              to="/register"
              className="
                bg-white
                text-gray-900
                hover:bg-gray-100
                px-7
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Search Box */}

        <div
          className="
            mt-12
            bg-white
            rounded-2xl
            shadow-xl
            p-5
            max-w-5xl
          "
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-4
            "
          >
            <input
              type="text"
              placeholder="Search location"
              className="
                border
                rounded-lg
                px-4
                py-3
                outline-none
                text-gray-700
              "
            />

            <select
              className="
                border
                rounded-lg
                px-4
                py-3
                text-gray-700
                outline-none
              "
            >
              <option>Property Type</option>

              <option>Apartment</option>

              <option>House</option>

              <option>Villa</option>
            </select>

            <select
              className="
                border
                rounded-lg
                px-4
                py-3
                text-gray-700
                outline-none
              "
            >
              <option>Rent / Buy</option>

              <option>Rent</option>

              <option>Sale</option>
            </select>

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-lg
                flex
                items-center
                justify-center
                gap-2
                font-semibold
              "
            >
              <FaSearch />
              Search
            </button>
          </div>
        </div>

        {/* Stats */}

        <div
          className="
            mt-8
            flex
            gap-6
            flex-wrap
            text-white
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              bg-white/10
              backdrop-blur
              px-5
              py-3
              rounded-xl
            "
          >
            <FaBuilding className="text-2xl" />

            <div>
              <h3 className="font-bold text-xl">500+</h3>

              <p className="text-sm">Properties</p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              bg-white/10
              backdrop-blur
              px-5
              py-3
              rounded-xl
            "
          >
            <FaHome className="text-2xl" />

            <div>
              <h3 className="font-bold text-xl">1000+</h3>

              <p className="text-sm">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
