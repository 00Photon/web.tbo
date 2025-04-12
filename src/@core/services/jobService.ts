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
  job_type: string; 
  description: string;
  requirements: string;
  skill: string;
  currency: string;
  minimum_salary: number;
  maximum_salary: number;
  location: string;
  application_deadline: string;
  additional_info?: string;
}) => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");
  
    const token = session.user.accessToken;
  
    const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobDetails),
    });

    // Log the raw response to see what's being returned
    const responseText = await response.text();
    console.log("Response Text: ", responseText);

    // If the response is not JSON, throw an error
    if (!response.ok) {
      throw new Error(`Error creating job: ${responseText}`);
    }

    // Try parsing the JSON if it's valid
    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (error) {
      throw new Error("Failed to parse JSON response.");
    }
  } catch (error: any) {
    console.error("Error creating job:", error.message);
    throw new Error(error.message || "Something went wrong while creating the job");
  }
};


export const activateJob = async (jobId: number) => {
  try {
    const response = await fetch(`/api/jobs/${jobId}/activate`, {
      method: 'PATCH',
    });
    
    if (!response.ok) {
      throw new Error('Failed to activate job');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error activating job:', error);
    throw error;
  }
};

export const deactivateJob = async (jobId: number): Promise<any> => {
  const session = await getSession(); 
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken; 

  const response = await fetch(`${API_BASE_URL}/admin/jobs/${jobId}/deactivate`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to deactivate job');
  }

  const data = await response.json();
  return data; 
};


export const deleteJob = async (jobId: number) => {
  const session = await getSession(); // Get the session, which includes the token
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken;

  const response = await fetch(`${API_BASE_URL}/admin/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }

  return response.json(); 
};