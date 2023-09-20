export const userLogIn = async (users) => {
  try {
    const response = await fetch("/api/v1/LogIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    });
    console.log("HAHAHAHHA hotdog", response);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};
