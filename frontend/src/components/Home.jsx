import React, { useEffect, useState } from "react";
import PropertyForm from "./PropertyForm";
import { fetchImages } from "../services/ImageServices";
import Category from "./Category";

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const image = await fetchImages();
        setImageData(image);
      } catch (error) {
        console.error("Error", error);
      }
    }
    const intervalId = setInterval(() => {
      fetchData();
    }, 11000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const filteredProperties = selectedCategory
    ? imageData.filter(
        (image) => image.property_listings?.property_type === selectedCategory
      )
    : imageData;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Category
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <header className="bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold"></h1>
          <button
            className="bg-[#FF385C] text-white rounded-lg py-2 px-6"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProperties.map((image) => (
          <div
            key={image.image_id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`images/${image.image_url}`}
              alt={image.originalname}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {image.property_listings?.users?.username && (
                <p className="text-gray-500 text-sm">
                  Hosted by: {image.property_listings.users.username}
                </p>
              )}
              <p className="text-gray-500 text-sm">
                Location: {image.property_listings?.location}
              </p>
              {image.property_listings?.price !== undefined ? (
                <p className="text-gray-500 text-sm">
                  Price:{" "}
                  {Number(image.property_listings.price).toLocaleString()}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">Price: N/A</p>
              )}

              <p className="text-gray-500 text-sm">
                Description: {image.property_listings?.description}
              </p>
              <p className="text-gray-500 text-sm">
                Bedroom: {image.property_listings?.bedrooms}
              </p>
              <p className="text-gray-500 text-sm">
                Bathroom: {image.property_listings?.bathrooms}
              </p>
              <p className="text-gray-500 text-sm">
                Living Room: {image.property_listings?.living_rooms}
              </p>
              <p className="text-gray-500 text-sm">
                Property Type: {image.property_listings?.property_type}
              </p>
              <div className="mt-4">
                <button className="bg-[#92c872] text-white rounded-lg px-4 py-2">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && <PropertyForm />}
    </div>
  );
}

export default Home;
