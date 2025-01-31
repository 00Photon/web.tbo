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
