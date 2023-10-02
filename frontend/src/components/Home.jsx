import React, { useEffect, useState } from "react";
import { getAllProperties } from "../services/PropertyListings";
import PropertyForm from "./PropertyForm";
import { fetchImages } from "../services/ImageServices";
import {
  FaLocationDot,
  ImPriceTag,
  FaBed,
  FaShower,
  BsFillPersonFill,
  BsFillHouseDoorFill,
  MdLiving,
} from "../icons/icons";

function Home() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState([]);

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const formatPrice = (price) => {
    const formattedPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return `₱${formattedPrice}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // const itemStorage = localStorage.getItem('data')
        // const user = JSON.parse(ite)
        const data = await getAllProperties();
        setProperties(data);
        const image = await fetchImages();
        setImages(image);
        console.log("Fetched Images:", image);
      } catch (error) {
        console.error("Error", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="h-screen max-w-6xl mx-auto mt-10 overflow-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-4">Property List</h1>
        <button
          className="bg-[#92c872] rounded-lg text-white w-[15%]"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div
            key={property.property_id}
            className="bg-white p-4 rounded shadow flex flex-col items-start"
          >
            {images &&
              images.length > 0 &&
              images.slice(0, 1).map((image, index) => (
                <img
                  key={index}
                  src={`images/${image.image_url}`} // Use the relative URL
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 mr-2 bg-cover rounded-md"
                />
              ))}
            <h2 className="text-xl font-semibold">{property.description}</h2>
            <p className="text-gray-600 flex items-center">
              <FaLocationDot className="mr-2" />
              {property.location}
            </p>
            <p className="text-gray-600 flex items-center">
              <ImPriceTag className="mr-2" />
              {formatPrice(parseFloat(property.price))}
            </p>
            <p className="text-gray-600 flex items-center">
              <FaBed className="mr-2" />
              {property.bedrooms}
            </p>
            <p className="text-gray-600 flex items-center">
              <FaShower className="mr-2" />
              {property.bathrooms}
            </p>
            <p className="text-gray-600 flex items-center">
              <MdLiving className="mr-2" />
              {property.living_rooms}
            </p>
            <p className="text-gray-600">Rating: {property.rating}</p>
            <p className="text-gray-600 flex items-center">
              <BsFillHouseDoorFill className="mr-2" />
              {property.property_type}
            </p>
            <p className="text-gray-600 flex items-center">
              <BsFillPersonFill className="mr-2" />
              {property.users.username}
            </p>
          </div>
        ))}
      </div>
      {showForm && <PropertyForm />}
    </div>
  );
}

export default Home;
