import React, { useEffect, useState } from "react";
import PropertyForm from "./PropertyForm";
import { fetchImages } from "../services/ImageServices";
import PropertyDetails from "./PropertyDetails";
import Category from "./Category";

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const closeDetails = () => {
    setSelectedProperty(null);
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
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const filteredProperties = selectedCategory
    ? imageData.filter(
        (image) => image.property_listings?.property_type === selectedCategory
      )
    : imageData;

  const handlePropertyClick = (image) => {
    setSelectedProperty(image);
  };

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
            onClick={() => handlePropertyClick(image)}
          >
            <img
              src={`images/${image.image_url}`}
              alt={image.originalname}
              className="w-full h-60 rounded-md object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 text-sm font-bold">
                {image.property_listings?.location}
              </p>
              <p className="text-gray-500 text-sm">
               {image.property_listings.description}
              </p>
              {image.property_listings?.price !== undefined ? (
                <p className="text-gray-500 text-sm font-bold">
                  Php
                  {Number(image.property_listings.price).toLocaleString()}
                /month</p>
              ) : (
                <p className="text-gray-500 text-sm font-bold">Php: N/A</p>
              )}
            </div>
          </div>
        ))}
        <PropertyDetails
          selectedProperty={selectedProperty}
          closeDetails={closeDetails}
        />
      </div>

      {showForm && <PropertyForm />}
    </div>
  );
}

export default Home;
