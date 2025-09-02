import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "@/services/tenant.service";
import { TenantsQueryParams, Tenant } from "@/types/tenant";

// Query keys
export const tenantQueryKeys = {
  all: ['tenants'] as const,
  lists: () => [...tenantQueryKeys.all, 'list'] as const,
  list: (params?: TenantsQueryParams) => [...tenantQueryKeys.lists(), params] as const,
  details: () => [...tenantQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...tenantQueryKeys.details(), id] as const,
};

// Get tenants list with filters
export function useTenants(params?: TenantsQueryParams) {
  return useQuery({
    queryKey: tenantQueryKeys.list(params),
    queryFn: () => tenantService.getTenants(params),
    select: (response) => response.data,
  });
}

// Get single tenant
export function useTenant(id: string) {
  return useQuery({
    queryKey: tenantQueryKeys.detail(id),
    queryFn: () => tenantService.getTenant(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

// Create tenant mutation
export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tenantService.createTenant,
    onSuccess: () => {
      // Invalidate and refetch tenant lists
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.lists() });
    },
  });
}

// Update tenant mutation
export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tenant> }) =>
      tenantService.updateTenant(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific tenant and lists
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.lists() });
    },
  });
}

// Update tenant status mutation
export function useUpdateTenantStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Tenant['status'] }) =>
      tenantService.updateTenantStatus(id, status),
    onSuccess: (_, variables) => {
      // Invalidate specific tenant and lists
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.lists() });
    },
  });
}

// Delete tenant mutation
export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tenantService.deleteTenant,
    onSuccess: () => {
      // Invalidate tenant lists
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.lists() });
    },
  });
}