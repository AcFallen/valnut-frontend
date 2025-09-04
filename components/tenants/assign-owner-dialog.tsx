"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAssignTenantOwner } from "@/hooks/useTenants";

const assignOwnerSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
});

type AssignOwnerFormData = z.infer<typeof assignOwnerSchema>;

interface AssignOwnerDialogProps {
  tenantId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignOwnerDialog({ tenantId, open, onOpenChange }: AssignOwnerDialogProps) {
  const assignOwnerMutation = useAssignTenantOwner();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignOwnerFormData>({
    resolver: zodResolver(assignOwnerSchema),
  });

  const onSubmit = async (data: AssignOwnerFormData) => {
    if (!tenantId) return;
    
    try {
      await assignOwnerMutation.mutateAsync({
        id: tenantId,
        data,
      });
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error assigning owner:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Asignar Propietario
          </DialogTitle>
          <DialogDescription>
            Asigna un propietario al consultorio seleccionado.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nombre
            </Label>
            <Input
              id="firstName"
              placeholder="Carlos"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Apellido
            </Label>
            <Input
              id="lastName"
              placeholder="López"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="carlos@drlopez.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={assignOwnerMutation.isPending}
              color="warning"
            >
              {assignOwnerMutation.isPending ? "Asignando..." : "Asignar Propietario"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}