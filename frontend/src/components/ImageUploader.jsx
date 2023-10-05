import React, { useState } from "react";
import { uploadFiles } from "../services/ImageServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageUpload = ({ handleImageUpload, property }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    try {
      const uploadedImages = await uploadFiles(files, property.property_id);
      console.log("Uploaded files: ", uploadedImages);
  
      if (Array.isArray(uploadedImages) && uploadedImages.length > 0) {
        const imageIds = uploadedImages.map((image) => image.image_id);
        console.log("Image IDs:", imageIds);
        handleImageUpload(imageIds); // Pass image IDs to the parent component
      } else {
        return null;
      }
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };
  
  
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-400 flex justify-center items-center">
        <div>
          <div className="flex items-center text-black gap-2">
            <input
              type="file"
              name="files"
              className="mt-1 text-white"
              onChange={handleFileChange}
              multiple
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleUpload}
                className="px-4 py-2 font-medium text-white bg-green-800 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImageUpload;