"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  AlertTriangle,
  StickyNote,
  Building2,
  Heart,
  UserCheck,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { PatientDetail } from "@/services/patient.service";

interface PatientDetailSidebarProps {
  patient: PatientDetail | undefined;
  isLoading: boolean;
  selectedPatientId: string | null;
}

export function PatientDetailSidebar({
  patient,
  isLoading,
  selectedPatientId,
}: PatientDetailSidebarProps) {
  if (!selectedPatientId) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                Selecciona un paciente
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Haz clic en una fila de la tabla para ver los detalles del paciente
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!patient) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                Error al cargar
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                No se pudo cargar la información del paciente
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Detalles del Paciente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">
              {patient.firstName} {patient.lastName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={patient.isActive ? "default" : "secondary"}>
                {patient.isActive ? "Activo" : "Inactivo"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {patient.gender === "male" ? "Masculino" : "Femenino"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contacto
          </h4>
          <div className="space-y-2 pl-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="break-all">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span>{patient.phone}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Personal Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Información Personal
          </h4>
          <div className="space-y-2 pl-6">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span>
                {format(new Date(patient.dateOfBirth), "d 'de' MMMM 'de' yyyy", {
                  locale: es,
                })}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
              <span className="break-words">{patient.address}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Medical History */}
        {patient.medicalHistory && (
          <>
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Historial Médico
              </h4>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground break-words">
                  {patient.medicalHistory}
                </p>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Allergies */}
        {patient.allergies && (
          <>
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Alergias
              </h4>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground break-words">
                  {patient.allergies}
                </p>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Notes */}
        {patient.notes && (
          <>
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <StickyNote className="h-4 w-4" />
                Notas
              </h4>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground break-words">
                  {patient.notes}
                </p>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Tenant Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Consultorio
          </h4>
          <div className="space-y-2 pl-6">
            <div className="text-sm font-medium">
              {patient.tenant.name}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{patient.tenant.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{patient.tenant.phone}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Registration Date */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Fechas
          </h4>
          <div className="space-y-1 pl-6 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Registrado: </span>
              {format(new Date(patient.createdAt), "d MMM yyyy 'a las' HH:mm", {
                locale: es,
              })}
            </div>
            <div>
              <span className="font-medium">Actualizado: </span>
              {format(new Date(patient.updatedAt), "d MMM yyyy 'a las' HH:mm", {
                locale: es,
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}