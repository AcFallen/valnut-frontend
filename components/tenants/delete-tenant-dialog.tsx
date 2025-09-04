"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteTenant } from "@/hooks/useTenants";

interface DeleteTenantDialogProps {
  tenantId: string | null;
  tenantName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTenantDialog({
  tenantId,
  tenantName,
  open,
  onOpenChange,
}: DeleteTenantDialogProps) {
  const deleteTenantMutation = useDeleteTenant();

  const handleDelete = async () => {
    if (!tenantId) return;

    try {
      await deleteTenantMutation.mutateAsync(tenantId);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Eliminar Consultorio
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el
            consultorio y todos sus datos asociados.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-4 border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              ¿Estás seguro de que deseas eliminar el consultorio?
            </p>
            <p className="text-sm text-red-600 dark:text-red-300 mt-1">
              <strong>{tenantName}</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleteTenantMutation.isPending}
            color="danger"
          >
            {deleteTenantMutation.isPending
              ? "Eliminando..."
              : "Eliminar Consultorio"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
