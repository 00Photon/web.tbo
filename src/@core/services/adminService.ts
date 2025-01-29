// import { API_BASE_URL } from "@/@core/utils/constants";

import axios from "axios";

// Admin data Interface
export interface AdminData {
  id: number;
  name: string;
  email: string;
  level: string;
  role: string;
  status: boolean;
}

// API base URL API

const API_BASE_URL = "https://api.tbo-taas.com/api/v1/admin";
console.log(API_BASE_URL);

// Function to fetch admin data
export const getAdmins = async (): Promise<AdminData[]> => {
  try {
    const response = await axios.get<AdminData[]>(`${API_BASE_URL}/clients`);
    console.log(response);
    console.log(response.data.clients);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

console.log(getAdmins());
