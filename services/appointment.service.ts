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
    | "no_show"
    | "rescheduled";
  notes: string | null;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
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
    | "no_show"
    | "rescheduled";
  nutritionistId?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    appointmentId: string;
    patientId: string;
    patientName: string;
    nutritionistId: string;
    nutritionistName: string;
    consultationType: string;
    status: string;
    notes?: string;
    duration: number;
  };
}

export interface CalendarEventsResponse {
  success: boolean;
  data: CalendarEvent[];
  code: number;
  message: string;
}

export interface CalendarQueryParams {
  start?: string; // YYYY-MM-DD
  end?: string; // YYYY-MM-DD
  nutritionistId?: string;
  patientId?: string;
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
    | "no_show"
    | "rescheduled";
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
    | "no_show"
    | "rescheduled";
  notes?: string;
  durationMinutes?: number;
  patientId?: string;
  nutritionistId?: string;
}

export interface RescheduleAppointmentData {
  newAppointmentDate: string;
  newAppointmentTime: string;
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

  // Reschedule appointment by ID
  rescheduleAppointment: async (
    id: string,
    rescheduleData: RescheduleAppointmentData
  ): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.patch(
      `/appointments/${id}/reschedule`,
      rescheduleData
    );
    return response.data;
  },

  // Get calendar events
  getCalendarEvents: async (
    params: CalendarQueryParams = {}
  ): Promise<CalendarEventsResponse> => {
    const searchParams = new URLSearchParams();

    if (params.start) searchParams.append("start", params.start);
    if (params.end) searchParams.append("end", params.end);
    if (params.nutritionistId)
      searchParams.append("nutritionistId", params.nutritionistId);
    if (params.patientId) searchParams.append("patientId", params.patientId);

    const response = await apiClient.get(
      `/appointments/calendar?${searchParams.toString()}`
    );
    
    // Transform appointments to calendar events
    const appointments = response.data.data;
    const transformedEvents = appointments.map((appointment: Appointment) => {
      const startDateTime = `${appointment.appointmentDate}T${appointment.appointmentTime}`;
      const startDate = new Date(startDateTime);
      const endDate = new Date(startDate.getTime() + appointment.durationMinutes * 60000);
      
      // Status-based colors with intuitive color coding
      const statusColors = {
        scheduled: { bg: '#3b82f6', border: '#1d4ed8' },     // Azul - Programada
        confirmed: { bg: '#059669', border: '#047857' },     // Verde oscuro - Confirmada
        in_progress: { bg: '#f59e0b', border: '#d97706' },   // Amarillo/Naranja - En progreso
        completed: { bg: '#22c55e', border: '#15803d' },     // Verde claro - Completada
        cancelled: { bg: '#dc2626', border: '#b91c1c' },     // Rojo - Cancelada
        no_show: { bg: '#64748b', border: '#475569' },       // Gris azulado - No asistió
        rescheduled: { bg: '#8b5cf6', border: '#7c3aed' }    // Morado - Reagendada
      };

      const colors = statusColors[appointment.status as keyof typeof statusColors] || statusColors.scheduled;

      return {
        id: appointment.id,
        title: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        allDay: false,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        textColor: '#ffffff',
        extendedProps: {
          appointmentId: appointment.id,
          patientId: appointment.patient.id,
          patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
          nutritionistId: appointment.nutritionist.id,
          nutritionistName: `${appointment.nutritionist.profile.firstName} ${appointment.nutritionist.profile.lastName}`,
          consultationType: appointment.consultationType,
          status: appointment.status,
          notes: appointment.notes || '',
          duration: appointment.durationMinutes
        }
      };
    });

    return {
      success: response.data.success,
      data: transformedEvents,
      code: response.data.code,
      message: response.data.message
    };
  },
};
