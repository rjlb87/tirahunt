import React, { useEffect, useState } from "react";
import { fetchImagesByUser } from "../services/ImageServices";
import Navbar from "../common/NavBar";

const UserProfile = () => {
  const [property, setProperty] = useState([]);

  const fetchImages = async () => {
    try {
      const userProperty = localStorage.getItem("data");
      const userData = JSON.parse(userProperty);
      const PropData = await fetchImagesByUser(userData.id);
      console.log("PropData:", PropData); // Check the structure and URLs here
      setProperty(PropData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {property.map((imageData) => (
          <div key={imageData.image_id}>
            <img
              src={`images/${imageData.image_url}`}
              alt={imageData.originalname}
              className="object-cover w-full h-40 rounded-md"
            />
            <div>
              <p>Description: {imageData.property_listings.description}</p>
              <p>Location: {imageData.property_listings.location}</p>
              <p>Price: {imageData.property_listings.price}</p>
              {imageData.property_listings?.users?.username && (
                <p>
                  Hosted by: {imageData.property_listings.users.username}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
