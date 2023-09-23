import React, { useState } from "react";
import { uploadFiles } from "../services/ImageServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageUpload = () => {
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
      await uploadFiles(files);
      console.log("Uploaded files: ", files);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-gray-300 border rounded-md flex justify-center items-center">
        <div>
          <div className="flex items-center text-black gap-2">
            <label htmlFor="image" className="block text-md  text-black pl-2">
              Image
            </label>
            <input
              type="file"
              name="files"
              className="mt-1 text-black "
              onChange={handleFileChange}
              multiple
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleUpload}
                className="px-4 py-2 font-medium text-black  rounded-r border-l-4  border-white  hover:bg-[#77af57] "
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
