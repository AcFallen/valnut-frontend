"use client";

import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleAppointmentDialog } from "@/components/appointments/schedule-appointment-dialog";

export default function AppointmentsPage() {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestión de Citas
            </h1>
            <p className="text-muted-foreground">
              Programa y gestiona las citas con tus pacientes
            </p>
          </div>
        </div>
        <Button onClick={() => setIsScheduleDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agendar Cita
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center space-y-4">
          <Calendar className="h-16 w-16 mx-auto text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Sistema de Citas en Desarrollo
            </h3>
            <p className="text-gray-500 max-w-md">
              El sistema completo de gestión de citas estará disponible próximamente.
              Por ahora puedes agendar nuevas citas usando el botón "Agendar Cita".
            </p>
          </div>
          <Button 
            onClick={() => setIsScheduleDialogOpen(true)}
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agendar Nueva Cita
          </Button>
        </div>
      </div>

      {/* Schedule Appointment Dialog */}
      <ScheduleAppointmentDialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      />
    </div>
  );
}