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
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-foreground">{patient?.email}</p>
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
                  <div className="md:col-span-2">
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
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Informacion Medica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Historial Medico
                    </label>
                    <p className="text-foreground mt-1 p-3 bg-muted/30 rounded-md">
                      {patient?.medicalHistory ||
                        "Sin historial medico registrado"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Alergias
                    </label>
                    <p className="text-foreground mt-1 p-3 bg-muted/30 rounded-md">
                      {patient?.allergies || "Sin alergias registradas"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Notas Adicionales
                    </label>
                    <p className="text-foreground mt-1 p-3 bg-muted/30 rounded-md">
                      {patient?.notes || "Sin notas adicionales"}
                    </p>
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
