"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useDeletePatient } from "@/hooks/usePatients";
import type { PatientDetail } from "@/services/patient.service";

interface DeletePatientAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: PatientDetail | null;
  onDeleted?: () => void;
}

export function DeletePatientAlert({
  open,
  onOpenChange,
  patient,
  onDeleted,
}: DeletePatientAlertProps) {
  const deletePatientMutation = useDeletePatient();

  const handleDelete = async () => {
    if (!patient) return;

    try {
      await deletePatientMutation.mutateAsync(patient.id);
      onOpenChange(false);
      onDeleted?.();
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente al paciente{" "}
            <strong>
              {patient?.firstName} {patient?.lastName}
            </strong>{" "}
            de la base de datos. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePatientMutation.isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deletePatientMutation.isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {deletePatientMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Eliminar Paciente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}