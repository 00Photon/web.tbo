import { API_BASE_URL } from "@/@core/utils/constants"
import { getSession } from 'next-auth/react';



export const fetchJobs = async () => {
  const session = await getSession(); // Get the session, which includes the token
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken; 

  const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  const data = await response.json();
  return data;
};
export const fetchJobsById = async (id: string) => {
  const session = await getSession();
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken;

  const response = await fetch(`${API_BASE_URL}/admin/jobs/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch job details');
  }

  const data = await response.json();
  return data;
};

export const createJob = async (jobDetails: {
  title: string;
  job_type: string; // 'Full-time', 'Part-time', etc.
  description: string;
  requirements: string;
  skills: string;
  currency: string; // e.g., 'USD'
  minimum_salary: number;
  maximum_salary: number;
  location: string; // e.g., 'Remote', 'On-site'
  application_deadline: string; // 'YYYY-MM-DD'
  additional_information?: string; // Optional field
}) => {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }

    const token = session.user.accessToken;

    const response = await fetch(`${API_BASE_URL}/api/v1/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobDetails),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create the job");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error creating job:", error.message);
    throw new Error(error.message || "Something went wrong while creating the job");
  }
};