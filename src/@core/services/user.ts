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

  company_logo?: File | string;
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

export const uploadFile = async (formData: FormData) => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  if (!token) throw new Error("Missing token");

  const response = await axios.post(`${API_BASE_URL}/upload-file`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // Should include { url: "https://..." }
};

interface ResetRequestResponse {
  status: boolean;
  message: string;
  reset_token: string;
}

interface ResetVerifyResponse {
  status: boolean;
  message: string;
  reset_token: string;
}

interface ResetPasswordResponse {
  status: boolean;
  message: string;
}

interface ResetPasswordPayload {
  email: string;
  reset_token: string;
  password: string;
  password_confirmation: string;
}

export const requestPasswordReset = async (email: string): Promise<ResetRequestResponse> => {
  try {
    const response = await axios.post<ResetRequestResponse>(
      `${API_BASE_URL}/password/request-reset`,
      { email }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error requesting password reset:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to request password reset");
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
};

export const verifyResetOtp = async (data: {
  email: string;
  otp: string;
  reset_token: string;
}): Promise<ResetVerifyResponse> => {
  try {
    const response = await axios.post<ResetVerifyResponse>(
      `${API_BASE_URL}/password/verify-otp`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error verifying OTP:", error.response?.data);
      throw new Error(error.response?.data?.message || "OTP verification failed");
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
};

export const resetPassword = async (data: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
  try {
    const response = await axios.post<ResetPasswordResponse>(
      `${API_BASE_URL}/password/reset`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error resetting password:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to reset password");
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
};


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
export const getAllUser = async (): Promise<any> => {
  
  const res = await fetch(`${API_BASE_URL}/users`, {
   
  });

  const data = await res.json();
  console.log("USER ME response:", data);

  if (!res.ok) throw new Error("Unauthorized");

  return data;
};

export const getAlljobs = async (): Promise<any> => {
  
  const res = await fetch(`${API_BASE_URL}/jobs`, {
   
  });

  const data = await res.json();
  console.log("USER ME response:", data);

  if (!res.ok) throw new Error("Unauthorized");

  return data;
};



