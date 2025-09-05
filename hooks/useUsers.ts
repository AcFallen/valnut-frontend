import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, CreateTenantUserData } from "@/services/user.service";
import { tenantQueryKeys } from "./useTenants";
import { toast } from "react-hot-toast";

// Query keys for users
export const userQueryKeys = {
  all: ['users'] as const,
  roles: () => [...userQueryKeys.all, 'roles'] as const,
};

// Get all available roles
export function useRoles() {
  return useQuery({
    queryKey: userQueryKeys.roles(),
    queryFn: () => userService.getRoles(),
    select: (response) => response.data,
  });
}

// Create tenant user mutation
export function useCreateTenantUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateTenantUserData) => userService.createTenantUser(userData),
    onSuccess: () => {
      // Refetch tenant users data to update the list
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.users() });
      toast.success("Usuario creado exitosamente");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      
      // Extraer el mensaje de error del servidor
      const errorMessage = 
        error?.response?.data?.error || 
        error?.response?.data?.message || 
        error?.response?.data?.details?.message ||
        error?.message ||
        "Error al crear el usuario";
      
      toast.error(errorMessage);
    },
  });
}