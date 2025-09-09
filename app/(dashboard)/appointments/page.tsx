"use client";

import { useState } from "react";
import { Calendar, Plus, Table, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAppointments,
  useAppointmentCalendar,
} from "@/hooks/useAppointments";
import { ScheduleAppointmentDialog } from "@/components/appointments/schedule-appointment-dialog";
import { AppointmentsTable } from "@/components/appointments/appointments-table";
import { AppointmentsCalendar } from "@/components/appointments/appointments-calendar";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export default function AppointmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [nutritionistId, setNutritionistId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [limit] = useState(10);
  const [view, setView] = useState<"table" | "calendar">("table");

  // Calendar date range - current week from Monday to Sunday
  const today = new Date();
  const rangeStart = startOfWeek(today, { weekStartsOn: 1 }); // Start of this week (Monday)
  const rangeEnd = endOfWeek(today, { weekStartsOn: 1 }); // End of this week (Sunday)
  const calendarStart = format(rangeStart, "yyyy-MM-dd");
  const calendarEnd = format(rangeEnd, "yyyy-MM-dd");

  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useAppointments({
    page: currentPage,
    limit,
    ...(nutritionistId && { nutritionistId }),
    ...(appointmentDate && { appointmentDate }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(consultationType && { consultationType: consultationType as any }),
    ...(statusFilter && { status: statusFilter as any }),
  });

  // Calendar events
  const {
    data: calendarEvents,
    isLoading: isLoadingCalendar,
    error: calendarError,
  } = useAppointmentCalendar({
    start: calendarStart,
    end: calendarEnd,
    ...(nutritionistId && { nutritionistId }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNutritionistIdChange = (id: string) => {
    setNutritionistId(id);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleAppointmentDateChange = (date: string) => {
    setAppointmentDate(date);
    setCurrentPage(1);
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    setCurrentPage(1);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    setCurrentPage(1);
  };

  const handleConsultationTypeChange = (type: string) => {
    setConsultationType(type);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

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
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
            className="flex items-center gap-2"
          >
            <Table className="h-4 w-4" />
            Tabla
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
            className="flex items-center gap-2"
          >
            <Grid className="h-4 w-4" />
            Calendario
          </Button>
        </div>
      </div>

      {/* Content based on view */}
      {view === "table" ? (
        <AppointmentsTable
          data={appointmentsData}
          isLoading={isLoadingAppointments}
          error={appointmentsError}
          currentPage={currentPage}
          appointmentDate={appointmentDate}
          startDate={startDate}
          endDate={endDate}
          consultationType={consultationType}
          statusFilter={statusFilter}
          nutritionistId={nutritionistId}
          onPageChange={handlePageChange}
          onAppointmentDateChange={handleAppointmentDateChange}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onConsultationTypeChange={handleConsultationTypeChange}
          onStatusFilterChange={handleStatusFilterChange}
          onNutritionistIdChange={handleNutritionistIdChange}
          onCreateAppointment={() => setIsScheduleDialogOpen(true)}
        />
      ) : (
        <AppointmentsCalendar
          events={calendarEvents || []}
          isLoading={isLoadingCalendar}
          nutritionistId={nutritionistId}
          onNutritionistIdChange={handleNutritionistIdChange}
          onCreateAppointment={() => setIsScheduleDialogOpen(true)}
          onDateSelect={(selectInfo: any) => {
            // When user selects a date in calendar, open appointment dialog
            // You can also set the selected date in the dialog
            setIsScheduleDialogOpen(true);
          }}
          onEventClick={(clickInfo: any) => {
            // Handle appointment click - maybe show details or edit dialog
            console.log("Event clicked:", clickInfo.event);
          }}
        />
      )}

      {/* Schedule Appointment Dialog */}
      <ScheduleAppointmentDialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      />
    </div>
  );
}
