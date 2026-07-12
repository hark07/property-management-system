import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { getProperties } from "../../services/propertyService";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const data = await getProperties({
        limit: 6,
      });

      setProperties(data.properties || []);
    } catch (error) {
      console.log("Featured Property Error:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Featured Properties</h2>

          <p className="text-gray-500 mt-3">
            Explore our latest available properties
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-10">No properties available.</div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
