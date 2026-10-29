
import axios from "axios";

const getcurrentuser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await axios.get(
      "http://localhost:5000/api/user/currentuser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Backend user:", response.data);

    // The backend returns the user object directly
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return null;
  }
};

export default getcurrentuser;
