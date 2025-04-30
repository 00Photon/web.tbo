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


export interface UpdateUserPayload {
  name: string;
  email: string;
  account_type: 'TALENT' | 'EMPLOYER';
  phone_number: string;
  cv_upload?: string;
  cover_letter_upload?: string;
  id_upload?: string;
  video_url?: string;
  project_screenshots?: string[];
  work_sample_upload?: string;
  portfolio_link?: string;
  profile_image?: string;

  company_logo?: string;
  company_name?: string;
  company_email_address?: string;
  industry?: string;
  number_of_employees?: string;
  type_of_employer?: string;
  company_address?: string;
  company_phone_number?: string;
  country?: string;
  company_website?: string;
  contact_person?: string;
  work_email?: string;
  position_in_company?: string;

  role?: string;
  adminPrivileges?: string;
}

export const updateUser = async (userId: number, data: Partial<UpdateUserPayload>) => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    if (!token) throw new Error("Missing token");

    const response = await axios.put(
      `${API_BASE_URL}/user/update/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 && response.data.status) {
      console.log('User successfully updated');
      return response.data;
    } else {
      const errorMsg = response.data.message || 'Unknown error';
      console.error('Error updating user:', errorMsg);
      throw new Error(errorMsg);
    }
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


