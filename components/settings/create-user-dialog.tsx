"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import { useRoles, useCreateTenantUser } from "@/hooks/useUsers";

const createUserSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Debe ser un email válido"),
  roleId: z.string().min(1, "Debe seleccionar un rol"),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({
  open,
  onOpenChange,
}: CreateUserDialogProps) {
  const { data: roles, isLoading: loadingRoles } = useRoles();
  const createUserMutation = useCreateTenantUser();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: "",
    },
  });

  const onSubmit = (data: CreateUserForm) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Crear Nuevo Usuario
          </DialogTitle>
          <DialogDescription>
            Agrega un nuevo usuario a tu consultorio asignándole un rol
            específico.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                placeholder="Juan"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                placeholder="Pérez"
                {...register("lastName")}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan.perez@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="roleId">Rol</Label>
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={loadingRoles}
                >
                  <SelectTrigger
                    className={
                      errors.roleId ? "border-destructive w-full" : "w-full"
                    }
                  >
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingRoles ? (
                      <SelectItem value="loading" disabled>
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Cargando roles...
                        </div>
                      </SelectItem>
                    ) : (
                      roles?.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div>
                            <div className="font-medium">{role.name}</div>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.roleId && (
              <p className="text-sm text-destructive">
                {errors.roleId.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createUserMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createUserMutation.isPending}
              className="gap-2"
            >
              {createUserMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
