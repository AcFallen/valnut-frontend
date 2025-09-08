export type TenantStatus = "active" | "inactive" | "suspended";
export type UserType = "tenant_owner" | "tenant_user";

// Role types for users API
export interface Role {
  id: string;
  name: string;
}

export interface UserRole {
  id: string;
  role: Role;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
}

export interface TenantUser {
  id: string;
  username: string;
  userType: UserType;
  profile: UserProfile;
  userRoles: UserRole[];
}

// Tenant Membership types
export interface TenantMembership {
  id: string;
  tenantId: string;
  membershipId: string;
  startDate: string;
  endDate: string;
  status: string;
  amountPaid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  membership: {
    id: string;
    name: string;
    description: string;
    price: string;
    durationMonths: number;
    maxUsers: number;
    maxPatients: number;
    features: {
      apiAccess: boolean;
      mealPlans: boolean;
      basicReports: boolean;
      advancedReports: boolean;
      patientManagement: boolean;
      appointmentScheduling: boolean;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
  };
}

export interface TenantSettings {
  currency?: string;
  language?: string;
  timezone?: string;
}

// User interface for users within tenant data
export interface TenantUserInList {
  id: string;
  username: string;
  userType: UserType;
  profile: UserProfile;
  roles: Array<{
    name: string;
    description: string;
    isTenantAdmin: boolean;
  }>;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: TenantStatus;
  expirationDate: string;
  settings: TenantSettings | null;
  createdAt: string;
  updatedAt: string;
  tenantMemberships: TenantMembership[];
  currentMembership: TenantMembership;
  users: TenantUserInList[];
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

// API Response types
export interface TenantResponse {
  success: boolean;
  data: Tenant;
  code: number;
  message: string;
}

export interface UsersResponse {
  success: boolean;
  data: TenantUser[];
  code: number;
  message: string;
}