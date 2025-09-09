import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

export interface Appointment {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationType:
    | "initial"
    | "followup"
    | "nutritional_plan"
    | "medical_checkup"
    | "emergency";
  status:
    | "scheduled"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  notes: string | null;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  nutritionist: {
    id: string;
    profile: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface PaginatedAppointmentsResponse {
  success: boolean;
  data: {
    data: Appointment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  code: number;
  message: string;
}

export interface AppointmentDetailResponse {
  success: boolean;
  data: Appointment;
  code: number;
  message: string;
}

export interface AppointmentsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  appointmentDate?: string;
  startDate?: string;
  endDate?: string;
  consultationType?:
    | "initial"
    | "followup"
    | "nutritional_plan"
    | "medical_checkup"
    | "emergency";
  status?:
    | "scheduled"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  nutritionistId?: string;
}

export interface CreateAppointmentData {
  appointmentDate: string;
  appointmentTime: string;
  consultationType:
    | "initial"
    | "followup"
    | "nutritional_plan"
    | "medical_checkup"
    | "emergency";
  status?:
    | "scheduled"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  notes?: string;
  durationMinutes: number;
  patientId: string;
  nutritionistId: string;
}

export interface UpdateAppointmentData {
  appointmentDate?: string;
  appointmentTime?: string;
  consultationType?:
    | "initial"
    | "followup"
    | "nutritional_plan"
    | "medical_checkup"
    | "emergency";
  status?:
    | "scheduled"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  notes?: string;
  durationMinutes?: number;
  patientId?: string;
  nutritionistId?: string;
}

export const appointmentService = {
  // Get paginated appointments list
  getAppointments: async (
    params: AppointmentsQueryParams = {}
  ): Promise<PaginatedAppointmentsResponse> => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.search) searchParams.append("search", params.search);
    if (params.appointmentDate)
      searchParams.append("appointmentDate", params.appointmentDate);
    if (params.startDate) searchParams.append("startDate", params.startDate);
    if (params.endDate) searchParams.append("endDate", params.endDate);
    if (params.consultationType)
      searchParams.append("consultationType", params.consultationType);
    if (params.status) searchParams.append("status", params.status);
    if (params.nutritionistId)
      searchParams.append("nutritionistId", params.nutritionistId);

    const response = await apiClient.get(
      `/appointments?${searchParams.toString()}`
    );
    return response.data;
  },

  // Get appointment details by ID
  getAppointmentById: async (
    id: string
  ): Promise<AppointmentDetailResponse> => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },

  // Create new appointment
  createAppointment: async (
    appointmentData: CreateAppointmentData
  ): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.post("/appointments", appointmentData);
    return response.data;
  },

  // Update appointment by ID
  updateAppointment: async (
    id: string,
    appointmentData: UpdateAppointmentData
  ): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.patch(
      `/appointments/${id}`,
      appointmentData
    );
    return response.data;
  },

  // Delete appointment by ID
  deleteAppointment: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/appointments/${id}`);
    return response.data;
  },
};
