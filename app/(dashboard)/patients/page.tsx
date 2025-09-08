"use client";

import { useState } from "react";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { usePatients, usePatientDetail } from "@/hooks/usePatients";
import { useDebounce } from "@/hooks/useDebounce";
import { PatientsTable } from "@/components/patients/patients-table";
import { PatientDetailSidebar } from "@/components/patients/patient-detail-sidebar";

export default function PatientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
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
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pacientes por nombre o email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Patients Table */}
          <PatientsTable
            data={patientsData}
            isLoading={isLoadingPatients}
            error={patientsError}
            selectedPatientId={selectedPatientId}
            onPatientSelect={handlePatientSelect}
            onPageChange={handlePageChange}
            currentPage={currentPage}
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
    </div>
  );
}