import axios from "axios";

// Admin data Interface
export interface ClientData {
  id: number;
  name: string;
  account_type: string;
  email: string;
  status: string;
  clients: string;
  level: string;
}

// API base URL API
const API_BASE_URL = "https://api.tbo-taas.com/api/v1/admin";
console.log(API_BASE_URL);

// Function to fetch admin data
export const getClients = async (): Promise<ClientData[]> => {
  try {
    const response = await axios.get<ClientData[]>(`${API_BASE_URL}/clients`);
    console.log(response);
    console.log(response.data.clients);
    return response.data.clients; // Return the fetched data
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

console.log(getClients());
