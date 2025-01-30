import axios from "axios";

export interface Job {
  id: number;
  title: string;
  job_type: string;
  description: string;
  requirements: string;
  skill: string;
  currency: string;
  minimum_salary: string;
  maximum_salary: string;
  location: string;
  application_deadline: string;
  additional_info: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  status: string;
}

// Define the API response structure
interface ApiResponse {
  status: boolean;
  jobs: Job[];
}

// Base URL for the API
const API_BASE_URL = "https://api.tbo-taas.com/api/v1/jobs";
console.log(API_BASE_URL);

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/jobs`);
    console.log(response.data.jobs);
    return response.data.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

console.log(getJobs());
