import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/@core/utils/constants"
import { getSession } from 'next-auth/react';
// Admin data Interface
export interface ClientData {
  id: number;
  name: string;
  account_type: string;
  company_logo: string;
  company_name: string;
  company_email_address: string;
  industry: string;
  number_of_employees: string;
  type_of_employer: string;
  company_address: string;
  company_phone_number: string | null;
  country: string | null;
  company_website: string;
  email: string;
  status: string;
  // Add other fields as needed
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

export const activateClient = async (ClientId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/clients/${ClientId}/activate`, {
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

export const deactivateClient = async (ClientId: number): Promise<any> => {
  const session = await getSession(); 
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken; 

  const response = await fetch(`${API_BASE_URL}/admin/clients/${ClientId}/deactivate`, {
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
export const deleteClient = async (ClientId: number): Promise<any> => {
  const session = await getSession(); 
  if (!session || !session.user) throw new Error("User is not authenticated");

  const token = session.user.accessToken; 

  const response = await fetch(`${API_BASE_URL}/admin/clients/${ClientId}`, {
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

console.log(getClients());
