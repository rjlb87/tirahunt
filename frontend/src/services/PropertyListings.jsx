export async function getAllProperties() {
  try {
    const response = await fetch("/api/v1/listings");
    console.log("here", response);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw Error;
  }
}

export const createProperty = async (property) => {
  console.log("here", property)
  try {
    // property.image_id = selectedImage;
    // property.user_id = user_id;
    const response = await fetch("/api/v1/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error creating property");
    }
  } catch (error) {
    console.error("Error creating property", error);
    throw error;
  }
};
