export async function getAllusers() {
  try {
    const response = await fetch("/api/v1/users");
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export async function editUsers(data) {
  const response = await fetch(`/api/v1/users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ users: data }),
  });
  return await response.json();
}

export const createUsers = async (users) => {
  try {
    const response = await fetch("/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users }),
    });
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export async function deleteUsers(id) {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
      });
      return true;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
