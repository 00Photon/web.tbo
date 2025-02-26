import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/@core/utils/constants"
// Admin data Interface
export interface CandidateData {
  id: number;
  name: string;
  email: string;
  experience: string;
  dateApplied: string;
  status: string;
  clients: string;
  applications: number;
  phone_number: string;
  date: string;
}

// API response interface
interface APIResponse {
  talents: CandidateData[];
}

// Function to fetch talents data
export const getCandidates = async (): Promise<CandidateData[]> => {
  try {
    const response: AxiosResponse<APIResponse> = await axios.get(
      `${API_BASE_URL}/admin/talents`
    );
    console.log(response);
    console.log(response.data.talents);
    return response.data.talents; // Fix: Use "talents" instead of "clients"
  } catch (error) {
    console.error("Error fetching talents:", error);
    throw error;
  }
};


console.log(getCandidates());
