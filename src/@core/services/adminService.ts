// import { API_BASE_URL } from "@/@core/utils/constants";

import axios, { AxiosResponse } from "axios";
import { ReactNode } from "react";

// Admin data Interface
export interface AdminData {
  account_type: ReactNode;
  id: number;
  name: string;
  email: string;
  level: string;
  role: string;
  status: boolean;
}

// API response interface
interface APIResponse {
  clients: AdminData[];
}

// API base URL API

const API_BASE_URL = "https://api.tbo-taas.com/api/v1/admin";
console.log(API_BASE_URL);

// Function to fetch admin data
export const getAdmins = async (): Promise<AdminData[]> => {
  try {
    const response: AxiosResponse<APIResponse> = await axios.get(
      `${API_BASE_URL}/clients`
    );
    console.log(response);
    console.log(response.data.clients);
    return response.data.clients; // Return the fetched data
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

console.log(getAdmins());
