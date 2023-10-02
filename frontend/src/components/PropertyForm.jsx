import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload ";
import { createProperty } from "../services/PropertyListings";
import { AiOutlineClose } from "../icons/icons";

const PropertyForm = () => {
  const userID = localStorage.getItem("data");
  const [property, setProperty] = useState({
  user_id: userID ? JSON.parse(userID).id : "",
  description: "",
  location: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  living_rooms: "",
  rating: "",
  property_type: "",
  image_id: 1,
});
  const [imageId, setImageId] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const handleShow = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageUpload = (imageId) => {
    setProperty({ ...property, image_id: imageId || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data being sent to server:", property);

      const newProperty = await createProperty( property, imageId);

      console.log("Response from server:", newProperty);
      setProperty(property);
    } catch (error) {
      console.error("Error creating property", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-black rounded-lg shadow-lg">
      {!showForm && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center overflow-auto bg-opacity-75">
          <div className="bg-gray-500 px-6 max-w-lg py-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-4">
                Add a New Property
              </h2>
              <button onClick={handleShow}>
                <AiOutlineClose />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="mb-4">
                  <label
                    htmlFor="user_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    user_id:
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    id="user_id"
                    value={property.user_id}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={property.description}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={property.location}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price:
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={property.price}
                    onChange={handleChange}
                    required
                    pattern="[0-9,]*"
                    title="Please enter only numeric characters and commas."
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="bedrooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bedrooms:
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    id="bedrooms"
                    value={property.bedrooms}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="bathrooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bathrooms:
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    id="bathrooms"
                    value={property.bathrooms}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="living_rooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Living Rooms:
                  </label>
                  <input
                    type="number"
                    name="living_rooms"
                    id="living_rooms"
                    value={property.living_rooms}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating:
                  </label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    value={property.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="property_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Property Type:
                  </label>
                  <select
                    name="property_type"
                    id="property_type"
                    value={property.property_type}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  >
                    <option value="">Select Property Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Bed Space">Bed Space</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <ImageUpload onImageUploaded={handleImageUpload} />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyForm;
