import axios, { AxiosResponse } from "axios";

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

// API base URL API
const API_BASE_URL = "https://api.tbo-taas.com/api/v1/admin";
console.log(API_BASE_URL);

// Function to fetch admin data
export const getCandidates = async (): Promise<CandidateData[]> => {
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

console.log(getCandidates());
