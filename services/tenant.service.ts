import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";
import { Tenant, TenantsQueryParams, CreateTenantData } from "@/types/tenant";

export const tenantService = {
  // Get all tenants with optional filters
  getTenants: async (params?: TenantsQueryParams): Promise<ApiResponse<Tenant[]>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.status) {
      searchParams.append('status', params.status);
    }
    if (params?.page) {
      searchParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.search) {
      searchParams.append('search', params.search);
    }

    const response = await apiClient.get(`/tenants?${searchParams.toString()}`);
    return response.data;
  },

  // Get single tenant by ID
  getTenant: async (id: string): Promise<ApiResponse<Tenant>> => {
    const response = await apiClient.get(`/tenants/${id}`);
    return response.data;
  },

  // Create new tenant
  createTenant: async (tenant: CreateTenantData): Promise<ApiResponse<Tenant>> => {
    const response = await apiClient.post('/tenants', tenant);
    return response.data;
  },

  // Update tenant
  updateTenant: async (id: string, tenant: CreateTenantData): Promise<ApiResponse<Tenant>> => {
    const response = await apiClient.patch(`/tenants/${id}`, tenant);
    return response.data;
  },

  // Delete tenant
  deleteTenant: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/tenants/${id}`);
    return response.data;
  },

  // Update tenant status
  updateTenantStatus: async (id: string, status: Tenant['status']): Promise<ApiResponse<Tenant>> => {
    const response = await apiClient.patch(`/tenants/${id}/status`, { status });
    return response.data;
  }
};