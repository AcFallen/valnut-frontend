import { useQuery, useQueryClient } from "@tanstack/react-query";
import { patientService, PatientsQueryParams } from "@/services/patient.service";

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