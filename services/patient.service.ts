import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface PatientDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  medicalHistory: string;
  allergies: string;
  notes: string;
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    expirationDate: string | null;
    settings: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
  };
}

export interface PaginatedPatientsResponse {
  success: boolean;
  data: {
    data: Patient[];
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

export interface PatientDetailResponse {
  success: boolean;
  data: PatientDetail;
  code: number;
  message: string;
}

export interface PatientsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreatePatientData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  notes?: string;
}

export interface UpdatePatientData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  notes?: string;
}

export interface PatientSelectOption {
  id: string;
  name: string;
}

export interface PatientSelectResponse {
  success: boolean;
  data: PatientSelectOption[];
  code: number;
  message: string;
}

export const patientService = {
  // Get paginated patients list
  getPatients: async (params: PatientsQueryParams = {}): Promise<PaginatedPatientsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.search) searchParams.append('search', params.search);

    const response = await apiClient.get(`/patients?${searchParams.toString()}`);
    return response.data;
  },

  // Get patient details by ID
  getPatientById: async (id: string): Promise<PatientDetailResponse> => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },

  // Create new patient
  createPatient: async (patientData: CreatePatientData): Promise<ApiResponse<PatientDetail>> => {
    const response = await apiClient.post('/patients', patientData);
    return response.data;
  },

  // Update patient by ID
  updatePatient: async (id: string, patientData: UpdatePatientData): Promise<ApiResponse<PatientDetail>> => {
    const response = await apiClient.patch(`/patients/${id}`, patientData);
    return response.data;
  },

  // Delete patient by ID
  deletePatient: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  },

  // Get patients for select dropdown
  getPatientsSelect: async (): Promise<PatientSelectResponse> => {
    const response = await apiClient.get('/patients/select');
    return response.data;
  }
};