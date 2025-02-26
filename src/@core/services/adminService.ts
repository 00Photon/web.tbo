import { API_BASE_URL } from "@/@core/utils/constants"
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
  admins: AdminData[];
}

// API base URL API

// Function to fetch admin data
export const getAdmins = async (): Promise<AdminData[]> => {
  try {
    const response: AxiosResponse<APIResponse> = await axios.get(
      `${API_BASE_URL}/admin/admins`
    );
    console.log(response); // Log the full response for debugging
    console.log(response.data.admins); // Log the correct data field

    return response.data.admins; // Return the correct field from the response
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export const getAdminById = async (adminId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw error;
  }
};

console.log(getAdmins());
