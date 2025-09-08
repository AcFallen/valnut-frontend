import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

export interface RoleOption {
  id: string;
  name: string;
  description: string;
}

export interface RolesResponse {
  success: boolean;
  data: RoleOption[];
  code: number;
  message: string;
}

export interface CreateTenantUserData {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

export interface TenantUserResponse {
  success: boolean;
  data: any;
  code: number;
  message: string;
}

export const userService = {
  // Get all available roles
  getRoles: async (): Promise<RolesResponse> => {
    const response = await apiClient.get('/roles');
    return response.data;
  },

  // Create new tenant user
  createTenantUser: async (userData: CreateTenantUserData): Promise<TenantUserResponse> => {
    const response = await apiClient.post('/users/tenant-user', userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  }
};