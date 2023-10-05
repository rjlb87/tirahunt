import { toast } from "react-toastify";

export const uploadFiles = async (files, propertyId) => { // Add 'propertyId' parameter
  console.log("here", files);
  try {
    if (files.length > 4) {
      toast.error("Maximum upload of 4 files exceeded");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Include 'property_id' in the form data to associate the images with the property
    formData.append("property_id", propertyId);

    const response = await fetch("/api/v1/upload", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      toast.success("Images uploaded successfully");
      return response.json();
    } else {
      const errorMessage = await response.text();
      toast.error(`Error uploading images: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error uploading images", error);
    toast.error("Error uploading images");
    throw error;
  }
};


export const fetchImagesByUser = async (image_id) => {
  try {
    const response = await fetch(`/api/v1/images/${image_id}`); // Include the full URL
    const data = await response.json();
    console.log("Fetched Images:", data);
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export const fetchImages = async () => {
  try {
    const response = await fetch("/api/v1/images"); // Include the full URL
    const data = await response.json();
    console.log("Fetched Images:", data);
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
