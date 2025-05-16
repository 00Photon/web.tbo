import { API_BASE_URL } from "@/@core/utils/constants"
import axios from "axios";

interface InterviewData {
  application_id: number;
  user_id: number;
  interview_date: string;
  interview_time: string;
  interview_location: string;
  interviewer_department: string;
  interviewer_name: string;
  interviewer_role: string;
  interviewer_email: string;
  interviewer_phone: string;
  status: string;
}

export const scheduleInterview = async (data: InterviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/interviews/schedule`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error scheduling interview:", error);
    throw error.response?.data || error.message;
  }
};

export const fetchInterviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/interviews`);
    return response.data.interviews; // Axios automatically parses JSON
  } catch (error) {
    throw new Error("Failed to fetch interviews.");
  }
};


export const updateInterviewStatus = async (interviewId: number, status: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/interviews/${interviewId}/update`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update interview status');
  }
};