import axios from "axios";
import { getSession } from "next-auth/react";
import { API_BASE_URL } from "@/@core/utils/constants";
import {
  Job,
  AppliedJob,
  JobsApiResponse,
  AppliedJobsApiResponse
} from "./types/job"; // Adjust path based on your structure

export const getJobs = async (): Promise<Job[]> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;
    const response = await axios.get<JobsApiResponse>(`${API_BASE_URL}/talent/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.jobs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

export const saveJob = async (jobId: number): Promise<void> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    if (!token) throw new Error("Missing token");

    await axios.post(
      `${API_BASE_URL}/jobs/${jobId}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error (saveJob):", error.response?.data);
    } else {
      console.error("Unexpected Error (saveJob):", error);
    }
    throw error;
  }
};

export const applyJob = async (jobId: number): Promise<void> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    await axios.post(
      `${API_BASE_URL}/jobs/${jobId}/apply`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error (applyJob):", error.response?.data);
    } else {
      console.error("Unexpected Error (applyJob):", error);
    }
    throw error;
  }
};

export const getAppliedJobs = async (): Promise<AppliedJob[]> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;
    const response = await axios.get<AppliedJobsApiResponse>(`${API_BASE_URL}/talent/jobs-applied`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.status || !response.data.appliedJobs) {
      throw new Error("Invalid API response structure");
    }

    return response.data.appliedJobs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to fetch applied jobs");
    }
    console.error("Error:", error);
    throw new Error("An unexpected error occurred");
  }
};
export const fetchApplicationsForJob = async (id: number) => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;
    const response = await axios.get(`${API_BASE_URL}/admin/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.status || !response.data.application) {
      throw new Error("Invalid API response structure");
    }

    // Returning the application data directly
    return response.data.application;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to fetch application data");
    }
    console.error("Error:", error);
    throw new Error("An unexpected error occurred");
  }
};


