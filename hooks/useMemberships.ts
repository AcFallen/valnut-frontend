import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { membershipService } from "@/services/membership.service";
import { AssignMembershipData } from "@/types/membership";

// Query keys
export const membershipQueryKeys = {
  all: ['memberships'] as const,
};

// Get all available memberships
export function useMemberships() {
  return useQuery({
    queryKey: membershipQueryKeys.all,
    queryFn: () => membershipService.getMemberships(),
    select: (response) => response.data,
  });
}

// Assign membership mutation
export function useAssignMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tenantId, data }: { tenantId: string; data: AssignMembershipData }) =>
      membershipService.assignMembership(tenantId, data),
    onSuccess: () => {
      // Invalidate tenant lists to refresh membership status
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
}