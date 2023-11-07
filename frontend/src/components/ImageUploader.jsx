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
      <div className="bg-[#92c872] flex justify-center items-center">
        <div>
          <div className="flex items-center text-black gap-2">
            <input
              type="file"
              name="files"
              className="mt-1 text-white"
              onChange={handleFileChange}
              multiple
            />
            <div className="flex justify-center px-2 py-2">
              <button
                type="button"
                onClick={handleUpload}
                className="border px-2 font-medium text-gray-600 bg-[#92c872] rounded"
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
