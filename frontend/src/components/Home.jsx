import React, { useEffect, useState } from "react";
import { getAllProperties } from "../services/PropertyListings";

function Home() {
  const [properties, setProperties] = useState([]);

  const formatPrice = (price) => {
    const formattedPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return `₱${formattedPrice}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="h-screen max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-4">Property List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {properties.map((property) => (
          <div
            key={property.property_id}
            className="bg-white p-4 rounded shadow"
          >
            <img
              src={'./public/img_1.jpg'}
              alt="Property"
              className="w-full h-auto"
            />
            <h2 className="text-xl font-semibold">{property.description}</h2>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">
              Price: {formatPrice(parseFloat(property.price))}
            </p>
            <p className="text-gray-600">Bedrooms: {property.bedrooms}</p>
            <p className="text-gray-600">Bathrooms: {property.bathrooms}</p>
            <p className="text-gray-600">
              Living Rooms: {property.living_rooms}
            </p>
            <p className="text-gray-600">Rating: {property.rating}</p>
            <p className="text-gray-600">
              Property Type: {property.property_type}
            </p>
            <p className="text-gray-600">Username: {property.users.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
