"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit, Building, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTenant, useUpdateTenant } from "@/hooks/useTenants";
import { CreateTenantData } from "@/types/tenant";

const updateTenantSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
});

type UpdateTenantFormData = z.infer<typeof updateTenantSchema>;

interface EditTenantDialogProps {
  tenantId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTenantDialog({ tenantId, open, onOpenChange }: EditTenantDialogProps) {
  const { data: tenant, isLoading: isLoadingTenant } = useTenant(tenantId || "");
  const updateTenantMutation = useUpdateTenant();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTenantFormData>({
    resolver: zodResolver(updateTenantSchema),
  });

  // Pre-populate form when tenant data is loaded
  useEffect(() => {
    if (tenant && open) {
      reset({
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        address: tenant.address,
      });
    }
  }, [tenant, open, reset]);

  const onSubmit = async (data: UpdateTenantFormData) => {
    if (!tenantId) return;
    
    try {
      await updateTenantMutation.mutateAsync({
        id: tenantId,
        data: data as CreateTenantData,
      });
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar Consultorio</DialogTitle>
          <DialogDescription>
            Modifica los datos del consultorio seleccionado.
          </DialogDescription>
        </DialogHeader>
        
        {isLoadingTenant ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              Cargando datos del consultorio...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Nombre
              </Label>
              <Input
                id="edit-name"
                placeholder="Consultorio Nutricional ABC"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="contacto@consultorio.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono
              </Label>
              <Input
                id="edit-phone"
                placeholder="+1234567890"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Dirección
              </Label>
              <Input
                id="edit-address"
                placeholder="123 Main St, City, Country"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={updateTenantMutation.isPending}
                color="info"
              >
                {updateTenantMutation.isPending ? "Actualizando..." : "Actualizar Consultorio"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}