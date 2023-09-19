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
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-400 flex justify-center items-center">
        <div>
          <div className="flex items-center text-black gap-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Image
            </label>
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
