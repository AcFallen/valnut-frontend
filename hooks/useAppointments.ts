import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  appointmentService,
  AppointmentsQueryParams,
  CreateAppointmentData,
  UpdateAppointmentData,
  CalendarQueryParams,
} from "@/services/appointment.service";
import { toast } from "react-hot-toast";

// Query keys for appointments
export const appointmentQueryKeys = {
  all: ["appointments"] as const,
  list: (params: AppointmentsQueryParams) =>
    [...appointmentQueryKeys.all, "list", params] as const,
  detail: (id: string) => [...appointmentQueryKeys.all, "detail", id] as const,
  calendar: (params: CalendarQueryParams) =>
    [...appointmentQueryKeys.all, "calendar", params] as const,
};

// Get paginated appointments with filters
export function useAppointments(params: AppointmentsQueryParams = {}) {
  return useQuery({
    queryKey: appointmentQueryKeys.list(params),
    queryFn: () => appointmentService.getAppointments(params),
    select: (response) => response.data,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });
}

// Get appointment details by ID
export function useAppointmentDetail(id: string | null) {
  return useQuery({
    queryKey: appointmentQueryKeys.detail(id!),
    queryFn: () => appointmentService.getAppointmentById(id!),
    select: (response) => response.data,
    enabled: !!id, // Only fetch when id is provided
  });
}

// Create appointment mutation
export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentData: CreateAppointmentData) =>
      appointmentService.createAppointment(appointmentData),
    onSuccess: () => {
      // Invalidate all appointment queries to refresh the list
      queryClient.invalidateQueries({ queryKey: appointmentQueryKeys.all });
      toast.success("Cita creada exitosamente");
    },
    onError: (error: any) => {
      console.error("Error creating appointment:", error);

      // Extract error message from server response
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al crear la cita";

      toast.error(errorMessage);
    },
  });
}

// Update appointment mutation
export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      appointmentData,
    }: {
      id: string;
      appointmentData: UpdateAppointmentData;
    }) => appointmentService.updateAppointment(id, appointmentData),
    onSuccess: (data, variables) => {
      // Invalidate all appointment queries to refresh the list and details
      queryClient.invalidateQueries({ queryKey: appointmentQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: appointmentQueryKeys.detail(variables.id),
      });
      toast.success("Cita actualizada exitosamente");
    },
    onError: (error: any) => {
      console.error("Error updating appointment:", error);

      // Extract error message from server response
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al actualizar la cita";

      toast.error(errorMessage);
    },
  });
}

// Delete appointment mutation
export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentService.deleteAppointment(id),
    onSuccess: () => {
      // Invalidate all appointment queries to refresh the list
      queryClient.invalidateQueries({ queryKey: appointmentQueryKeys.all });
      toast.success("Cita eliminada exitosamente");
    },
    onError: (error: any) => {
      console.error("Error deleting appointment:", error);

      // Extract error message from server response
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al eliminar la cita";

      toast.error(errorMessage);
    },
  });
}

// Get calendar events
export function useAppointmentCalendar(params: CalendarQueryParams = {}) {
  return useQuery({
    queryKey: appointmentQueryKeys.calendar(params),
    queryFn: () => appointmentService.getCalendarEvents(params),
    select: (response) => response.data,
    staleTime: 30000, // Consider data fresh for 30 seconds
    enabled: !!(params.start && params.end), // Only fetch when we have start and end dates
  });
}
