"use client";

import { useState, useEffect } from "react";
import { format, parse, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useUsersSelect } from "@/hooks/useUsers";
import type { Appointment } from "@/services/appointment.service";

interface AppointmentsTableProps {
  data?: {
    data: Appointment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  isLoading: boolean;
  error: any;
  currentPage: number;
  appointmentDate: string;
  startDate: string;
  endDate: string;
  consultationType: string;
  statusFilter: string;
  nutritionistId: string;
  onPageChange: (page: number) => void;
  onAppointmentDateChange: (date: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onStatusFilterChange: (status: string) => void;
  onNutritionistIdChange: (nutritionistId: string) => void;
  onCreateAppointment: () => void;
}

const statusLabels = {
  scheduled: "Programada",
  confirmed: "Confirmada",
  in_progress: "En progreso",
  completed: "Completada",
  cancelled: "Cancelada",
  no_show: "No asistió",
};

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  confirmed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  in_progress:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  completed:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  no_show: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
};

const consultationTypeLabels = {
  initial: "Inicial",
  followup: "Seguimiento",
  nutritional_plan: "Plan Nutricional",
  medical_checkup: "Revisión Médica",
  emergency: "Emergencia",
};

export function AppointmentsTable({
  data,
  isLoading,
  error,
  currentPage,
  appointmentDate,
  startDate,
  endDate,
  consultationType,
  statusFilter,
  nutritionistId,
  onPageChange,
  onAppointmentDateChange,
  onStartDateChange,
  onEndDateChange,
  onConsultationTypeChange,
  onStatusFilterChange,
  onNutritionistIdChange,
  onCreateAppointment,
}: AppointmentsTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch nutritionists for filter select
  const { data: users } = useUsersSelect();

  // Helper function to parse date string without timezone issues
  const parseDateString = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;

    // For YYYY-MM-DD format, create date directly without timezone conversion
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day); // month is 0-indexed
    }

    return undefined;
  };

  // Date states for calendar pickers
  const [appointmentDateValue, setAppointmentDateValue] = useState<
    Date | undefined
  >(parseDateString(appointmentDate));
  const [startDateValue, setStartDateValue] = useState<Date | undefined>(
    parseDateString(startDate)
  );
  const [endDateValue, setEndDateValue] = useState<Date | undefined>(
    parseDateString(endDate)
  );

  // Sync local date states with props
  useEffect(() => {
    setAppointmentDateValue(parseDateString(appointmentDate));
  }, [appointmentDate]);

  useEffect(() => {
    setStartDateValue(parseDateString(startDate));
  }, [startDate]);

  useEffect(() => {
    setEndDateValue(parseDateString(endDate));
  }, [endDate]);

  const formatTime = (timeString: string) => {
    try {
      const time = parse(timeString, "HH:mm:ss", new Date());
      return format(time, "HH:mm");
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      // Parse the date string as-is without timezone conversion
      // If it's in YYYY-MM-DD format, parse it directly
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateString.split("-").map(Number);
        const date = new Date(year, month - 1, day); // month is 0-indexed
        return format(date, "d MMM yyyy", { locale: es });
      }
      // If it's a full ISO string, use parseISO
      const date = parseISO(dateString);
      return format(date, "d MMM yyyy", { locale: es });
    } catch {
      return dateString;
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                Error al cargar las citas
              </h3>
              <p className="text-muted-foreground mt-1">
                Ha ocurrido un error al cargar las citas. Intenta de nuevo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Lista de Citas
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button onClick={onCreateAppointment}>
              <Calendar className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          {data ? `${data.total} cita(s) encontrada(s)` : "Cargando citas..."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters Panel */}
        {showFilters && (
          <div className="border rounded-lg p-4 space-y-4 ">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filtros</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select
                  value={statusFilter || "all"}
                  onValueChange={(value) =>
                    onStatusFilterChange(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="scheduled">Programada</SelectItem>
                    <SelectItem value="confirmed">Confirmada</SelectItem>
                    <SelectItem value="in_progress">En progreso</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                    <SelectItem value="no_show">No asistió</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Consultation Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Consulta</label>
                <Select
                  value={consultationType || "all"}
                  onValueChange={(value) =>
                    onConsultationTypeChange(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="initial">Consulta Inicial</SelectItem>
                    <SelectItem value="followup">Seguimiento</SelectItem>
                    <SelectItem value="nutritional_plan">
                      Plan Nutricional
                    </SelectItem>
                    <SelectItem value="medical_checkup">
                      Revisión Médica
                    </SelectItem>
                    <SelectItem value="emergency">Emergencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nutritionist Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nutricionista</label>
                <Select
                  value={nutritionistId || "all"}
                  onValueChange={(value) =>
                    onNutritionistIdChange(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos los nutricionistas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los nutricionistas</SelectItem>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Appointment Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha Específica</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !appointmentDateValue && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {appointmentDateValue
                        ? format(
                            appointmentDateValue,
                            "d 'de' MMMM 'de' yyyy",
                            { locale: es }
                          )
                        : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={appointmentDateValue}
                      onSelect={(date) => {
                        setAppointmentDateValue(date);
                        onAppointmentDateChange(
                          date ? format(date, "yyyy-MM-dd") : ""
                        );
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Start Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha Desde</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDateValue && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDateValue
                        ? format(startDateValue, "d 'de' MMMM 'de' yyyy", {
                            locale: es,
                          })
                        : "Fecha de inicio"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDateValue}
                      onSelect={(date) => {
                        setStartDateValue(date);
                        onStartDateChange(
                          date ? format(date, "yyyy-MM-dd") : ""
                        );
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha Hasta</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDateValue && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDateValue
                        ? format(endDateValue, "d 'de' MMMM 'de' yyyy", {
                            locale: es,
                          })
                        : "Fecha de fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDateValue}
                      onSelect={(date) => {
                        setEndDateValue(date);
                        onEndDateChange(date ? format(date, "yyyy-MM-dd") : "");
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Clear Filters Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium invisible">
                  Acciones
                </label>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    onStatusFilterChange("");
                    onConsultationTypeChange("");
                    onNutritionistIdChange("");
                    onAppointmentDateChange("");
                    onStartDateChange("");
                    onEndDateChange("");
                    // Reset local date states
                    setAppointmentDateValue(undefined);
                    setStartDateValue(undefined);
                    setEndDateValue(undefined);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Nutricionista</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">No hay citas programadas</p>
                        <p className="text-sm text-muted-foreground">
                          Crea una nueva cita para empezar
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {appointment.patient.firstName}{" "}
                            {appointment.patient.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.patient.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium text-sm">
                            {appointment.nutritionist.profile.firstName}{" "}
                            {appointment.nutritionist.profile.lastName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {formatDate(appointment.appointmentDate)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTime(appointment.appointmentTime)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {consultationTypeLabels[appointment.consultationType] ||
                          appointment.consultationType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${
                          statusColors[appointment.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusLabels[appointment.status] || appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {appointment.durationMinutes} min
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Página {data.page} de {data.totalPages} ({data.total} resultados)
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!data.hasPrev}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!data.hasNext}
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
