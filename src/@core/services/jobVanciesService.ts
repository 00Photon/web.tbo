import axios from "axios";

import { getSession } from "next-auth/react";

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
const API_BASE_URL = "https://api.tbo-taas.com/api/v1";
console.log(API_BASE_URL);

export const getJobs = async (): Promise<Job[]> => {
  try {
    const session = await getSession(); // Get the session, which includes the token
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/jobs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.status);
    return response.data.jobs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data);
    } else {
      console.error("Unexpected Error:", error);
    }
    // console.error("Error fetching jobs:", error);
    throw error;
  }
};

console.log(getJobs());
