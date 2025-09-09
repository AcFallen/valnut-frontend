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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  tenantId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsersResponse {
  success: boolean;
  data: {
    data: User[];
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

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  userType?: string;
}

export interface TenantUserResponse {
  success: boolean;
  data: any;
  code: number;
  message: string;
}

export interface UserSelectOption {
  id: string;
  name: string;
}

export interface UserSelectResponse {
  success: boolean;
  data: UserSelectOption[];
  code: number;
  message: string;
}

export const userService = {
  // Get all available roles
  getRoles: async (): Promise<RolesResponse> => {
    const response = await apiClient.get("/roles");
    return response.data;
  },

  // Create new tenant user
  createTenantUser: async (
    userData: CreateTenantUserData
  ): Promise<TenantUserResponse> => {
    const response = await apiClient.post("/users/tenant-user", userData);
    return response.data;
  },

  // Get paginated users list
  getUsers: async (
    params: UsersQueryParams = {}
  ): Promise<PaginatedUsersResponse> => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.search) searchParams.append("search", params.search);

    const response = await apiClient.get(`/users?${searchParams.toString()}`);
    return response.data;
  },

  // Get users for select dropdown
  getUsersSelect: async (): Promise<UserSelectResponse> => {
    const response = await apiClient.get("/users/select");
    return response.data;
  },

  // Delete user
  deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  },
};
