import React from 'react';
import { FaWifi } from 'react-icons/fa';
import { TbAirConditioning } from 'react-icons/tb';
import { PiTelevisionSimple } from 'react-icons/pi';

const PropertyDetails = ({ selectedProperty, closeDetails }) => {
  if (!selectedProperty) {
    return null;
  }

  const {
    image_url,
    originalname,
    property_listings: {
      location,
      description,
      price,
      bedrooms,
      bathrooms,
      living_rooms,
      property_type,
      users: { username }
    }
  } = selectedProperty;

  // Array of objects with IDs and corresponding icon components
  const amenitiesIcons = [
    { id: 1, icon: <TbAirConditioning /> }, // Air Conditioning
    { id: 2, icon: <FaWifi /> }, // WiFi
    { id: 3, icon: <PiTelevisionSimple /> }, // TV
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button onClick={closeDetails} className="bg-red-500 text-white rounded-lg py-2 px-4 mt-4 absolute top-4 right-4">X</button>
        <div className="flex items-center mb-4">
          <img src={`images/${image_url}`} alt={originalname} className="w-32 rounded-lg mr-4" />
          <div>
            <h2 className="text-xl font-bold mb-2">{description}</h2>
            <p className="text-gray-600 mb-2">{location}</p>
            <p className="text-lg font-bold text-red-500 mb-2">Php{Number(price).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 pr-4">
            <p className="text-gray-700 mb-2">Hosted by: {username}</p>
            <p className="text-gray-700 mb-2">Property Type: {property_type}</p>
          </div>
          <div className="w-1/2 pr-4">
            <p className="text-gray-700 mb-2">Bedrooms: {bedrooms}</p>
            <p className="text-gray-700 mb-2">Bathrooms: {bathrooms}</p>
            <p className="text-gray-700 mb-2">Living Rooms: {living_rooms}</p>
          </div>
        </div>
        
        {/* Display icon for each amenity */}
        <div>
          <h3 className="text-lg font-bold mt-4">Amenities:</h3>
          <div className="flex items-center">
            {amenitiesIcons.map((amenity) => (
              <div key={amenity.id} className="mr-4">{amenity.icon}</div>
            ))}
          </div>
        </div>
        <button onClick={closeDetails} className="bg-green-500 text-white rounded-lg py-2 px-4 mt-4">Book Now</button>
      </div>
    </div>
  );
};

export default PropertyDetails;

