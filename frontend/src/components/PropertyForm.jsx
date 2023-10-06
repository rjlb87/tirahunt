import React, { useState } from "react";
import { createProperty } from "../services/PropertyListings";
import { AiOutlineClose } from "../icons/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "./ImageUploader";

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
    property_type: "",
    images: [],
  });
  const [showForm, setShowForm] = useState(false);

  const handleShow = () => {
    setShowForm(!showForm);
    if (showForm) {
      toast.success("Property Created");
    }
  };
  const formatPriceWithCommas = (value) => {
    const numberValue = parseFloat(value.replace(/,/g, ""));
    return numberValue.toLocaleString();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Format the price with commas
    if (name === "price") {
      const formattedPrice = formatPriceWithCommas(value);
      setProperty({ ...property, [name]: formattedPrice });
    } else {
      setProperty({ ...property, [name]: value });
    }
  };
  

  const handleImageUpload = (selectedFiles) => {
    console.log("Selected Files:", selectedFiles);
    setProperty({
      ...property,
      images: selectedFiles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await createProperty(property);
      console.log("Property created:", response);

      localStorage.setItem("propertyData", JSON.stringify(property));

      setProperty({
        ...property,
        property_id: response.property_id,
        description: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        living_rooms: "",
        property_type: "",
        images: [],
      });
      toast.success("Property Added");

    } catch (error) {
      toast.error("Invalid Inputs");
      console.error("Error creating property:", error);
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
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
                    onChange={handleInputChange}
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
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description:
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={property.description}
                    onChange={handleInputChange}
                    required
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  ></textarea>
                </div>
              <div className="text-center">
                {/* wag nyp to galawin */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Add Property
                </button>
              </div>

              <div className="mt-3">
                <ImageUpload
                  handleImageUpload={handleImageUpload}
                  property={property}
                />
              </div>
              <div className="text-center">
                <button
                  type="button" 
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={handleShow} 
                >
                  Submit
                </button>
              </div>
               {/* wag nyp to galawin */}
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PropertyForm;
