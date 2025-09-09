import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patientService, PatientsQueryParams, CreatePatientData, UpdatePatientData } from "@/services/patient.service";
import { toast } from "react-hot-toast";

// Query keys for patients
export const patientQueryKeys = {
  all: ['patients'] as const,
  list: (params: PatientsQueryParams) => [...patientQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...patientQueryKeys.all, 'detail', id] as const,
};

// Get paginated patients with search
export function usePatients(params: PatientsQueryParams = {}) {
  return useQuery({
    queryKey: patientQueryKeys.list(params),
    queryFn: () => patientService.getPatients(params),
    select: (response) => response.data,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });
}

// Get patient details by ID
export function usePatientDetail(id: string | null) {
  return useQuery({
    queryKey: patientQueryKeys.detail(id!),
    queryFn: () => patientService.getPatientById(id!),
    select: (response) => response.data,
    enabled: !!id, // Only fetch when id is provided
  });
}

// Create patient mutation
export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patientData: CreatePatientData) => patientService.createPatient(patientData),
    onSuccess: () => {
      // Invalidate all patient queries to refresh the list
      queryClient.invalidateQueries({ queryKey: patientQueryKeys.all });
      toast.success("Paciente creado exitosamente");
    },
    onError: (error: any) => {
      console.error("Error creating patient:", error);
      
      // Extract error message from server response
      const errorMessage = 
        error?.response?.data?.error || 
        error?.response?.data?.message || 
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al crear el paciente";
      
      toast.error(errorMessage);
    },
  });
}

// Update patient mutation
export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patientData }: { id: string; patientData: UpdatePatientData }) => 
      patientService.updatePatient(id, patientData),
    onSuccess: (data, variables) => {
      // Invalidate all patient queries to refresh the list and details
      queryClient.invalidateQueries({ queryKey: patientQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: patientQueryKeys.detail(variables.id) });
      toast.success("Paciente actualizado exitosamente");
    },
    onError: (error: any) => {
      console.error("Error updating patient:", error);
      
      // Extract error message from server response
      const errorMessage = 
        error?.response?.data?.error || 
        error?.response?.data?.message || 
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al actualizar el paciente";
      
      toast.error(errorMessage);
    },
  });
}

// Delete patient mutation
export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientService.deletePatient(id),
    onSuccess: () => {
      // Invalidate all patient queries to refresh the list
      queryClient.invalidateQueries({ queryKey: patientQueryKeys.all });
      toast.success("Paciente eliminado exitosamente");
    },
    onError: (error: any) => {
      console.error("Error deleting patient:", error);
      
      // Extract error message from server response
      const errorMessage = 
        error?.response?.data?.error || 
        error?.response?.data?.message || 
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al eliminar el paciente";
      
      toast.error(errorMessage);
    },
  });
}