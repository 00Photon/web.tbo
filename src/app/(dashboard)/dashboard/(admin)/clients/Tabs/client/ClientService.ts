import axios from "axios";

// Client data interface
interface MockData {
  logo: string;
  company: string;
  type: string;
  vacancies: number;
  applications: number;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1/admin";

// Function to fetch client data
export const getClients = async (): Promise<MockData[]> => {
  try {
    const response = await axios.get<MockData[]>(`${API_BASE_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
};
