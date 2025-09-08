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
  Heart,
  UserCheck,
  UserRound,
  Users,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
              <h3 className="font-semibold text-lg">Selecciona un paciente</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Haz clic en una fila de la tabla para ver los detalles del
                paciente
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
              <h3 className="font-semibold text-lg">Error al cargar</h3>
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
      <CardContent className="space-y-4">
        {/* Basic Info with Avatar */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback
                className={`text-white font-semibold ${
                  patient.gender === "male"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-pink-500 to-pink-600"
                }`}
              >
                {patient.gender === "male" ? (
                  <UserRound className="h-6 w-6" />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight">
                {patient.firstName} {patient.lastName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={patient.isActive ? "default" : "secondary"}
                  className="text-xs"
                >
                  {patient.isActive ? "Activo" : "Inactivo"}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs border-0 ${
                    patient.gender === "male"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300"
                      : "bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-300"
                  }`}
                >
                  {patient.gender === "male" ? "Masculino" : "Femenino"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Contact Information */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
              <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            Contacto
          </h4>
          <div className="space-y-1.5 pl-10">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                <Mail className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="break-all">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
                <Phone className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span>{patient.phone}</span>
                <button
                  onClick={() => {
                    const phoneNumber = patient.phone.replace(/[^\d+]/g, ''); // Remove all non-digit characters except +
                    const message = `Hola ${patient.firstName}, soy del ${patient.tenant.name}. ¿Cómo te encuentras?`;
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="p-1 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40 transition-colors"
                  title="Enviar mensaje por WhatsApp"
                >
                  <MessageCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Personal Information */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            Información Personal
          </h4>
          <div className="space-y-1.5 pl-10">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              </div>
              <span>
                {format(
                  new Date(patient.dateOfBirth),
                  "d 'de' MMMM 'de' yyyy",
                  {
                    locale: es,
                  }
                )}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="h-3 w-3 text-red-600 dark:text-red-400" />
              </div>
              <span className="break-words">{patient.address}</span>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Medical History */}
        {patient.medicalHistory && (
          <>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                Historial Médico
              </h4>
              <div className="pl-10">
                <p className="text-sm text-muted-foreground break-words">
                  {patient.medicalHistory}
                </p>
              </div>
            </div>
            <Separator className="my-3" />
          </>
        )}

        {/* Allergies */}
        {patient.allergies && (
          <>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                Alergias
              </h4>
              <div className="pl-10">
                <p className="text-sm text-muted-foreground break-words">
                  {patient.allergies}
                </p>
              </div>
            </div>
            <Separator className="my-3" />
          </>
        )}

        {/* Notes */}
        {patient.notes && (
          <>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 flex items-center justify-center">
                  <StickyNote className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                Notas
              </h4>
              <div className="pl-10">
                <p className="text-sm text-muted-foreground break-words">
                  {patient.notes}
                </p>
              </div>
            </div>
            <Separator className="my-3" />
          </>
        )}

        {/* Registration Date */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/30 dark:to-slate-700/30 flex items-center justify-center">
              <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
            Fechas
          </h4>
          <div className="space-y-1 pl-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <span className="font-medium text-foreground">
                  Registrado:{" "}
                </span>
                {format(
                  new Date(patient.createdAt),
                  "d MMM yyyy 'a las' HH:mm",
                  {
                    locale: es,
                  }
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-medium text-foreground">
                  Actualizado:{" "}
                </span>
                {format(
                  new Date(patient.updatedAt),
                  "d MMM yyyy 'a las' HH:mm",
                  {
                    locale: es,
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
