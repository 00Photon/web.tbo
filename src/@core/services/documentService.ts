import axios from "axios";
import { getSession } from "next-auth/react";

// Base URL for the API
const API_BASE_URL = "https://api.tbo-taas.com/api/v1";

// Fetch uploaded files
export const fetchUploadedFiles = async (): Promise<
  Record<string, string | null>
> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    const response = await axios.get<{
      status: boolean;
      files: Record<string, string | null>;
    }>(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.files;
  } catch (error) {
    console.error("Error fetching uploaded files:", error);
    throw error;
  }
};

// Upload a file
export const updateUserDocument = async (
  userId: number,
  documentType: string,
  file: File
): Promise<string> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const response = await axios.put<{ status: boolean; fileUrl: string }>(
      `${API_BASE_URL}/user/update/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.fileUrl;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

// Delete a file
export const deleteUserDocument = async (
  documentType: string
): Promise<void> => {
  try {
    const session = await getSession();
    if (!session || !session.user) throw new Error("User is not authenticated");

    const token = session.user.accessToken;

    await axios.delete(`${API_BASE_URL}/user/files/${documentType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
