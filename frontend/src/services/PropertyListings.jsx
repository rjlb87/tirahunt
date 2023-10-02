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

export const createProperty = async (property_listings) => {
  console.log("here", property_listings);
  try {
    const response = await fetch("/api/v1/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ property_listings }),
    });

    return response.json();
  } catch (error) {
    console.error("Error creating property", error);
    throw error;
  }
};
