import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/@core/utils/constants"
// Admin data Interface
export interface ClientData {
  created_at: any;
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




// Function to fetch admin data
export const getClients = async (): Promise<ClientData[]> => {
  try {
    const response: AxiosResponse<APIResponse> = await axios.get(
      `${API_BASE_URL}/admin/clients`
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
