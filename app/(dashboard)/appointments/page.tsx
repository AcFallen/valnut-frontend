"use client";

import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppointments } from "@/hooks/useAppointments";
import { ScheduleAppointmentDialog } from "@/components/appointments/schedule-appointment-dialog";
import { AppointmentsTable } from "@/components/appointments/appointments-table";

export default function AppointmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [limit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useAppointments({
    page: currentPage,
    limit,
    search: debouncedSearch || undefined,
    appointmentDate: appointmentDate || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    consultationType: consultationType || undefined,
    status: statusFilter || undefined,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1); // Reset to first page when searching
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
        <Button onClick={() => setIsScheduleDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agendar Cita
        </Button>
      </div>

      {/* Appointments Table */}
      <AppointmentsTable
        data={appointmentsData}
        isLoading={isLoadingAppointments}
        error={appointmentsError}
        currentPage={currentPage}
        search={search}
        appointmentDate={appointmentDate}
        startDate={startDate}
        endDate={endDate}
        consultationType={consultationType}
        statusFilter={statusFilter}
        onPageChange={handlePageChange}
        onSearchChange={handleSearchChange}
        onAppointmentDateChange={handleAppointmentDateChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onConsultationTypeChange={handleConsultationTypeChange}
        onStatusFilterChange={handleStatusFilterChange}
        onCreateAppointment={() => setIsScheduleDialogOpen(true)}
      />

      {/* Schedule Appointment Dialog */}
      <ScheduleAppointmentDialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      />
    </div>
  );
}