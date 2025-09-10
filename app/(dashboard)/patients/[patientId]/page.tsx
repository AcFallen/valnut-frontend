"use client";

import { useParams, useRouter } from "next/navigation";
import { usePatientDetail } from "@/hooks/usePatients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  Heart,
  AlertCircle,
  Clock,
  UserCheck,
  Stethoscope,
  Cake,
  MessageCircle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { getPatientAvatarAndAge } from "@/lib/utils";
import Image from "next/image";

interface AttentionRecord {
  id: string;
  date: string;
  attendedBy: string;
  type: "consulta" | "seguimiento" | "emergencia";
  notes: string;
  recommendations: string;
  status: "completada" | "pendiente" | "cancelada";
}

const dummyAttentions: AttentionRecord[] = [
  {
    id: "1",
    date: "2024-09-08",
    attendedBy: "Dr. Maria Gonzalez",
    type: "consulta",
    notes:
      "Consulta inicial. Evaluacion nutricional completa. Paciente presenta sobrepeso leve.",
    recommendations:
      "Dieta balanceada con reduccion del 20% en carbohidratos simples. Ejercicio moderado 3 veces por semana.",
    status: "completada",
  },
  {
    id: "2",
    date: "2024-08-25",
    attendedBy: "Lic. Carlos Ruiz",
    type: "seguimiento",
    notes:
      "Seguimiento de plan nutricional. Paciente ha perdido 2kg en 2 semanas.",
    recommendations:
      "Continuar con el plan actual. Aumentar ingesta de proteinas magras.",
    status: "completada",
  },
  {
    id: "3",
    date: "2024-08-10",
    attendedBy: "Dr. Maria Gonzalez",
    type: "consulta",
    notes:
      "Primera consulta. Analisis de habitos alimentarios y establecimiento de objetivos.",
    recommendations:
      "Iniciar plan de alimentacion saludable. Control en 2 semanas.",
    status: "completada",
  },
];

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params?.patientId as string;

  const { data: patient, isLoading, error } = usePatientDetail(patientId);

  // Obtener información del avatar y edad
  const avatarInfo = patient
    ? getPatientAvatarAndAge(patient.dateOfBirth, patient.gender)
    : null;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Error al cargar paciente
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  No se pudo cargar la informacion del paciente
                </p>
              </div>
              <Button
                onClick={() => router.push("/patients")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a Pacientes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/patients")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isLoading ? (
                <Skeleton className="h-8 w-64" />
              ) : (
                `${patient?.firstName} ${patient?.lastName}`
              )}
            </h1>
            {isLoading ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              <p className="text-muted-foreground">
                {`Paciente desde ${format(
                  new Date(patient?.createdAt || ""),
                  "MMMM yyyy",
                  { locale: es }
                )}`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informacion Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Columna del Avatar y Edad */}
                  <div className="flex flex-col items-center space-y-4 p-4 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border">
                    {avatarInfo && (
                      <>
                        <div className="relative">
                          <Image
                            src={avatarInfo.imagePath}
                            alt="Avatar del paciente"
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Cake className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-600 font-semibold">
                              {avatarInfo.ageText}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Edad del paciente
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Columna de Información Personal */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Nombre Completo
                      </label>
                      <p className="text-foreground">
                        {patient?.firstName} {patient?.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-foreground truncate">{patient?.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Telefono
                      </label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-foreground">{patient?.phone}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha de Nacimiento
                      </label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-foreground">
                          {patient?.dateOfBirth
                            ? format(
                                new Date(patient.dateOfBirth),
                                "d MMMM yyyy",
                                { locale: es }
                              )
                            : "No especificado"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Genero
                      </label>
                      <p className="text-foreground">
                        {patient?.gender === "male"
                          ? "Masculino"
                          : patient?.gender === "female"
                          ? "Femenino"
                          : patient?.gender === "other"
                          ? "Otro"
                          : "No especificado"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Tipo de Documento
                      </label>
                      <p className="text-foreground">
                        {patient?.documentType === "dni"
                          ? "DNI"
                          : patient?.documentType === "carnet_extranjeria"
                          ? "Carnet de Extranjeria"
                          : "No especificado"}
                      </p>
                    </div>
                    {patient?.documentNumber && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Numero de Documento
                        </label>
                        <p className="text-foreground">
                          {patient.documentNumber}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Direccion
                      </label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-foreground">
                          {patient?.address || "No especificado"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Heart className="h-5 w-5" />
                </div>
                Informacion Medica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 mt-0.5">
                        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                          Historial Medico
                        </label>
                        <div className="mt-2 p-4 bg-white/60 dark:bg-gray-900/30 rounded-lg border border-blue-100 dark:border-blue-900/30 shadow-sm">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {patient?.medicalHistory ||
                              "Sin historial medico registrado"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex-shrink-0 mt-0.5">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                          Alergias
                        </label>
                        <div className="mt-2 p-4 bg-white/60 dark:bg-gray-900/30 rounded-lg border border-amber-100 dark:border-amber-900/30 shadow-sm">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {patient?.allergies || "Sin alergias registradas"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex-shrink-0 mt-0.5">
                        <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                          Notas Adicionales
                        </label>
                        <div className="mt-2 p-4 bg-white/60 dark:bg-gray-900/30 rounded-lg border border-purple-100 dark:border-purple-900/30 shadow-sm">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {patient?.notes || "Sin notas adicionales"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Historial de Atenciones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4 p-6">
                {dummyAttentions.map((attention, index) => (
                  <div key={attention.id} className="relative">
                    {index < dummyAttentions.length - 1 && (
                      <div className="absolute left-4 top-8 w-px h-full bg-border" />
                    )}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                attention.type === "consulta"
                                  ? "default"
                                  : attention.type === "seguimiento"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {attention.type === "consulta"
                                ? "Consulta"
                                : attention.type === "seguimiento"
                                ? "Seguimiento"
                                : "Emergencia"}
                            </Badge>
                            <Badge
                              variant={
                                attention.status === "completada"
                                  ? "default"
                                  : attention.status === "pendiente"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {attention.status === "completada"
                                ? "Completada"
                                : attention.status === "pendiente"
                                ? "Pendiente"
                                : "Cancelada"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {format(new Date(attention.date), "d MMM yyyy", {
                              locale: es,
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <UserCheck className="h-3 w-3" />
                            {attention.attendedBy}
                          </div>
                        </div>
                        <div className="text-sm space-y-2">
                          <div>
                            <p className="font-medium text-foreground">
                              Notas:
                            </p>
                            <p className="text-muted-foreground">
                              {attention.notes}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              Recomendaciones:
                            </p>
                            <p className="text-muted-foreground">
                              {attention.recommendations}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < dummyAttentions.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
