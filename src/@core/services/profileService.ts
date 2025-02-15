import axios from "axios";
import { getSession } from "next-auth/react";

export interface User {
  id: number;
  name: string;
  email: string;
  account_type: string;
  phone_number: string | null;
  cv_upload: string | null;
  cover_letter_upload: string | null;
  id_upload: string | null;
}

interface ApiResponse {
  status: boolean;
  user: User;
}

// Base URL for the API
const API_BASE_URL = "https://api.tbo-taas.com/api/v1";
const API_PUT_URL = "https://api.tbo-taas.com/api/v1/user/update/1";

// Function to fetch user profile
export const getProfile = async (): Promise<User> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/user-me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Profile updated successfully:", response.data.status);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

console.log(getProfile());

// Function to update user profile
export const updateProfile = async (updatedData: {
  name: string;
  email: string;
  phone_number: string;
}): Promise<User> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    const response = await axios.put<ApiResponse>(
      `${API_PUT_URL}/update`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Profile updated successfully:", response.data.status);
    return response.data.user;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Function to upload a document
export const uploadDocument = async (
  userId: number,
  file: File,
  documentType: string
): Promise<void> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    // Make the PUT request
    const response = await axios.put(
      `${API_BASE_URL}/user/update/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      }
    );

    console.log("Document uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};
