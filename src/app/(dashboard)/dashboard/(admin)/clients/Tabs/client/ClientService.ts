import axios from "axios";

const API_BASE_URL = "https://api.tbo-taas.com/api/v1/admin";

export const getClients = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Assuming API returns the required fields
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
