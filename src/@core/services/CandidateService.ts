import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/@core/utils/constants"
// Admin data Interface
export interface CandidateData {
  id: number;
  name: string;
  email: string;
  experience: string;
  dateApplied: string;
  status: boolean;
  clients: string;
  applications: number;
  date: string;
}

// API response interface
interface APIResponse {
  clients: CandidateData[];
}

// Function to fetch admin data
export const getCandidates = async (): Promise<CandidateData[]> => {
  try {
    const response: AxiosResponse<APIResponse> = await axios.get(
      `${API_BASE_URL}/admin/talents`
    );
    console.log(response);
    console.log(response.data.clients);
    return response.data.clients; // Return the fetched data
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

console.log(getCandidates());
