"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PatientDetail } from "@/services/patient.service";
import { AvatarInfo } from "@/lib/utils";
import { UnderFiveForm } from "./forms/under-five-form";
import { FiveToNineteenForm } from "./forms/five-to-nineteen-form";
import { TwentyToFiftyForm } from "./forms/twenty-to-fifty-form";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, User } from "lucide-react";

interface NewConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: PatientDetail | null;
  avatarInfo: AvatarInfo | null;
}

export function NewConsultationDialog({
  open,
  onOpenChange,
  patient,
  avatarInfo,
}: NewConsultationDialogProps) {
  if (!patient || !avatarInfo) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="6xl">
          <DialogHeader>
            <DialogTitle>Nueva Consulta</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No se puede cargar la información del paciente
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  const renderFormByAge = () => {
    if (avatarInfo.ageInYears < 5) {
      return (
        <UnderFiveForm
          patientId={patient.id}
          dateOfBirth={patient.dateOfBirth}
        />
      );
    }

    if (avatarInfo.ageInYears >= 5 && avatarInfo.ageInYears <= 19) {
      return (
        <FiveToNineteenForm
          patientId={patient.id}
          dateOfBirth={patient.dateOfBirth}
        />
      );
    }

    if (avatarInfo.ageInYears >= 20 && avatarInfo.ageInYears <= 50) {
      return (
        <TwentyToFiftyForm
          patientId={patient.id}
          dateOfBirth={patient.dateOfBirth}
        />
      );
    }

    return (
      <Card className="p-8">
        <CardContent className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Formulario Pendiente
          </h3>
          <p className="text-gray-500">
            El formulario para esta edad aún está en desarrollo.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Edad del paciente: {avatarInfo.ageText}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="7xl" className="">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Calendar className="h-6 w-6 text-violet-600" />
            Nueva Consulta
          </DialogTitle>
        </DialogHeader>

        {/* ScrollArea para el contenido del formulario */}
        <ScrollArea className="max-h-[75vh] w-full">
          <div className="px-1">{renderFormByAge()}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
