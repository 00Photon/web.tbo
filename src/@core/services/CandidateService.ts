import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/@core/utils/constants"
import { getSession } from 'next-auth/react';
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


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCandidates = async (retries = 3): Promise<CandidateData[]> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response: AxiosResponse<APIResponse> = await axios.get(
        `${API_BASE_URL}/admin/talents`
      );
      console.log(response.data.talents);
      return response.data.talents;
    } catch (error: any) {
      if (error.response?.status === 429 && i < retries - 1) {
        const waitTime = 1000 * Math.pow(2, i); // exponential backoff: 1s, 2s, 4s
        console.warn(`Rate limited. Retrying in ${waitTime / 1000}s...`);
        await delay(waitTime);
        continue;
      }
      console.error("Error fetching talents:", error);
      throw error;
    }
  }
  throw new Error("Max retries exceeded.");
};


export const activateCandidate = async (ClientId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/talents/${ClientId}/activate`, {
      method: 'PUT',
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

export const deactivateCandidate = async (ClientId: number): Promise<any> => {
  const session = await getSession(); 
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken; 

  const response = await fetch(`${API_BASE_URL}/admin/talents/${ClientId}/deactivate`, {
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
export const deleteCandidate = async (ClientId: number): Promise<any> => {
  const session = await getSession(); 
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken; 

  const response = await fetch(`${API_BASE_URL}/admin/talents/${ClientId}`, {
    method: 'DELETE',
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

