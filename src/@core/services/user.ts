import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from "@/@core/utils/constants"
import { getSession } from 'next-auth/react';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  account_type: string;
  company_logo?: string;
  company_name?: string;
  company_email_address?: string;
  industry?: string;
  number_of_employees?: string;
  type_of_employer?: string;
  company_address?: string;
  company_phone_number?: string | null;
  country?: string | null;
  company_website?: string;
  contact_person?: string | null;
  work_email?: string | null;
  position_in_company?: string | null;
}
export interface UpdateUserPayload {
  name: string;
  email: string;
  role: string;
  adminPrivileges: string;
}


interface CurrentUserResponse {
  status: boolean;
  user: CurrentUser;
}

export const changePassword = async ( data: { current_password: string, password: string, password_confirmation: string }) => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;
  
    if (!token) throw new Error("Missing token");
  
    const response = await axios.put(`${API_BASE_URL}/change_password/`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, );
    return response.data; 
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change password");
  }
};

export const updateUser = async (userId: number, data: UpdateUserPayload) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/update/${userId}`, data);
    return response.data; // Return response data
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

export const getCurrentUser = async (): Promise<any> => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  if (!token) throw new Error("Missing token");

  const res = await fetch(`${API_BASE_URL}/user-me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log("USER ME response:", data);

  if (!res.ok) throw new Error("Unauthorized");

  return data;
};
