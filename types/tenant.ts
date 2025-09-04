export type TenantStatus = "active" | "inactive" | "suspended";
export type UserType = "tenant_owner" | "tenant_user";

export interface UserRole {
  name: string;
  description: string;
  isTenantAdmin: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface TenantUser {
  id: string;
  username: string;
  userType: UserType;
  profile: UserProfile;
  roles: UserRole[];
}

export interface TenantSettings {
  currency: string;
  language: string;
  timezone: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: TenantStatus;
  users: TenantUser[];
  expirationDate?: string | null;
  settings?: TenantSettings;
  createdAt?: string;
  updatedAt?: string;
}

// Data for creating a new tenant
export interface CreateTenantData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Query parameters for tenant list
export interface TenantsQueryParams {
  status?: TenantStatus;
  page?: number;
  limit?: number;
  search?: string;
}