import { useEffect, useState } from "react";

import PropertyCard from "./PropertyCard";

import { getProperties } from "../../services/propertyService";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties({
          search: "",
          type: "All",
          city: "All",
        });

        setProperties(data.properties || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

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
        <h2
          className="
          text-3xl
          font-bold
          text-center
          mb-10
        "
        >
          Featured Properties
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
        >
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
