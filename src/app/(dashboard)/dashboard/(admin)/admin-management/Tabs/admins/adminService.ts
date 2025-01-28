import axios from "axios";

// Define the interface for the admin data
export interface AdminData {
  id: number;
  name: string;
  email: string;
  level: string;
  role: string;
  status: boolean;
}

// Define the base URL for your API
const API_BASE_URL = "http://127.0.0.1:8000/api/v1/";

// Function to fetch admin data
export const getAdmins = async (): Promise<AdminData[]> => {
  try {
    const response = await axios.get<AdminData[]>(`${API_BASE_URL}/jobs`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error; // Handle the error appropriately
  }
};
