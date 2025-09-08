"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { usePatients, usePatientDetail } from "@/hooks/usePatients";
import { useDebounce } from "@/hooks/useDebounce";
import { PatientsTable } from "@/components/patients/patients-table";
import { PatientDetailSidebar } from "@/components/patients/patient-detail-sidebar";
import { CreatePatientDialog } from "@/components/patients/create-patient-dialog";

export default function PatientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [limit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: patientsData,
    isLoading: isLoadingPatients,
    error: patientsError,
  } = usePatients({
    page: currentPage,
    limit,
    search: debouncedSearch || undefined,
  });

  const {
    data: selectedPatient,
    isLoading: isLoadingPatient,
  } = usePatientDetail(selectedPatientId);

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Pacientes
          </h1>
          <p className="text-muted-foreground">
            Gestiona y consulta la información de tus pacientes
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Table */}
        <div className="lg:col-span-2">
          {/* Patients Table */}
          <PatientsTable
            data={patientsData}
            isLoading={isLoadingPatients}
            error={patientsError}
            selectedPatientId={selectedPatientId}
            onPatientSelect={handlePatientSelect}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            search={search}
            onSearchChange={setSearch}
            onCreatePatient={() => setIsCreateDialogOpen(true)}
          />
        </div>

        {/* Right Column - Patient Detail */}
        <div className="lg:col-span-1">
          <PatientDetailSidebar
            patient={selectedPatient}
            isLoading={isLoadingPatient}
            selectedPatientId={selectedPatientId}
          />
        </div>
      </div>

      {/* Create Patient Dialog */}
      <CreatePatientDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}