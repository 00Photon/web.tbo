import axios, { AxiosResponse } from "axios";

// Admin data Interface
export interface ClientData {
  Avatar: any;
  registrationDate: any;
  applications: any;
  activeJobs: any;
  contactPerson: any;
  company: any;
  id: number;
  name: string;
  account_type: string;
  email: string;
  status: string;
  clients: string;
  level: string;
}

// API response interface
interface APIResponse {
  clients: ClientData[];
}

// API base URL API
const API_BASE_URL = "https://api.tbo-taas.com/api/v1/admin";
console.log(API_BASE_URL);

// Function to fetch admin data
export const getClients = async (): Promise<ClientData[]> => {
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

console.log(getClients());
