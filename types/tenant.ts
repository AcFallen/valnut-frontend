export type TenantStatus = "active" | "inactive" | "suspended";

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
  expirationDate: string | null;
  settings: TenantSettings;
  createdAt: string;
  updatedAt: string;
}

// Query parameters for tenant list
export interface TenantsQueryParams {
  status?: TenantStatus;
  page?: number;
  limit?: number;
  search?: string;
}