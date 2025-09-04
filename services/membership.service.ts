import apiClient from "@/lib/api-client";
import {
  Membership,
  AssignMembershipData,
  MembershipsResponse,
} from "@/types/membership";

export const membershipService = {
  // Get available memberships
  getMemberships: async () => {
    const response = await apiClient.get<MembershipsResponse>(`/memberships`);
    return response.data;
  },

  // Assign membership to a tenant
  assignMembership: async (tenantId: string, data: AssignMembershipData) => {
    const response = await apiClient.post(
      `/tenants/${tenantId}/membership`,
      data
    );
    return response.data;
  },
};
