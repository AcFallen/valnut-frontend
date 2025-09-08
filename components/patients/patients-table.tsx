"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Users,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Patient } from "@/services/patient.service";

interface PatientsTableProps {
  data: {
    data: Patient[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | undefined;
  isLoading: boolean;
  error: any;
  selectedPatientId: string | null;
  onPatientSelect: (patientId: string) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  search: string;
  onSearchChange: (search: string) => void;
}

export function PatientsTable({
  data,
  isLoading,
  error,
  selectedPatientId,
  onPatientSelect,
  onPageChange,
  currentPage,
  search,
  onSearchChange,
}: PatientsTableProps) {
  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Error al cargar pacientes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Ha ocurrido un error al obtener la lista de pacientes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Lista de Pacientes
          {data && (
            <Badge variant="secondary" className="ml-2">
              {data.total} total
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Search Section */}
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pacientes por nombre o email..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="px-6 py-4 font-semibold">Paciente</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Contacto</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Fecha de Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="px-6 py-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
              ))
            ) : data && data.data.length > 0 ? (
              // Patient rows
              data.data.map((patient) => (
                <TableRow
                  key={patient.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/50 border-b border-border/50",
                    selectedPatientId === patient.id && "bg-muted/70 hover:bg-muted/70"
                  )}
                  onClick={() => onPatientSelect(patient.id)}
                >
                  <TableCell className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">
                        {patient.firstName} {patient.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        ID: {patient.id.split('-')[0]}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="truncate text-foreground">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-muted-foreground">{patient.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-sm text-foreground font-medium">
                      {format(new Date(patient.createdAt), "d MMM yyyy", {
                        locale: es,
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // No patients found
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 px-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        No hay pacientes
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm">
                        No se encontraron pacientes que coincidan con tu búsqueda.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium text-foreground">{data.data.length}</span> de{" "}
                <span className="font-medium text-foreground">{data.total}</span> pacientes
              </div>
              <Badge variant="outline" className="text-xs">
                Página {data.page}/{data.totalPages}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!data.hasPrev}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!data.hasNext}
                className="gap-1"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}