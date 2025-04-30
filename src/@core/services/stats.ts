import { API_BASE_URL } from "@/@core/utils/constants";

import axios, { AxiosResponse } from "axios";


export interface RecentUser {
  id: number;
  name: string;
  email: string;
  joined_date: string;
}

export interface StatsData {
  total_users: number;
  total_applications: number;
  total_interviews: number;
  total_jobs: number;
  active_jobs: number;
  total_companies: number;
  recent_users: RecentUser[];
}

export const getAdminStats = async (): Promise<StatsData> => {
  try {
    const response: AxiosResponse<StatsData> = await axios.get(
      `${API_BASE_URL}/admin/stats`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};
export const getTalentStats = async (): Promise<StatsData> => {
  try {
    const response: AxiosResponse<StatsData> = await axios.get(
      `${API_BASE_URL}/talent/stats`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};