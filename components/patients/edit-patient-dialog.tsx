"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn, parseLocalDate } from "@/lib/utils";
import { useUpdatePatient } from "@/hooks/usePatients";
import type {
  UpdatePatientData,
  PatientDetail,
  DocumentType,
} from "@/services/patient.service";

const updatePatientSchema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .max(100, "El apellido no puede exceder 100 caracteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Ingresa un email válido"),
  documentType: z
    .enum(["dni", "carnet_extranjeria"])
    .refine((val) => val !== undefined, {
      message: "El tipo de documento es requerido",
    }),
  documentNumber: z
    .string()
    .min(1, "El número de documento es requerido")
    .max(20, "El número de documento no puede exceder 20 caracteres"),
  phone: z
    .string()
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.date().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  isPregnant: z.boolean().optional(),
  address: z.string().optional().or(z.literal("")),
  medicalHistory: z.string().optional().or(z.literal("")),
  allergies: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

type UpdatePatientFormData = z.infer<typeof updatePatientSchema>;

interface EditPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: PatientDetail | null;
}

export function EditPatientDialog({
  open,
  onOpenChange,
  patient,
}: EditPatientDialogProps) {
  const updatePatientMutation = useUpdatePatient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdatePatientFormData>({
    resolver: zodResolver(updatePatientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      documentType: undefined,
      documentNumber: "",
      phone: "",
      address: "",
      isPregnant: false,
      medicalHistory: "",
      allergies: "",
      notes: "",
    },
  });

  // Load patient data into form when patient changes
  useEffect(() => {
    if (patient && open) {
      reset({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        documentType: patient.documentType as
          | "dni"
          | "carnet_extranjeria"
          | undefined,
        documentNumber: patient.documentNumber || "",
        phone: patient.phone || "",
        dateOfBirth: patient.dateOfBirth
          ? parseLocalDate(patient.dateOfBirth)
          : undefined,
        gender: patient.gender as "male" | "female" | "other" | undefined,
        isPregnant: patient.isPregnant || false,
        address: patient.address || "",
        medicalHistory: patient.medicalHistory || "",
        allergies: patient.allergies || "",
        notes: patient.notes || "",
      });
    }
  }, [patient, open, reset]);

  const onSubmit = async (data: UpdatePatientFormData) => {
    if (!patient) return;

    try {
      const submitData: UpdatePatientData = {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? format(data.dateOfBirth, "yyyy-MM-dd")
          : undefined,
        // Remove empty strings and convert to undefined
        phone: data.phone || undefined,
        address: data.address || undefined,
        isPregnant: data.gender === "female" ? data.isPregnant : undefined,
        medicalHistory: data.medicalHistory || undefined,
        allergies: data.allergies || undefined,
        notes: data.notes || undefined,
        documentType: data.documentType as DocumentType,
        documentNumber: data.documentNumber || undefined,
      };

      await updatePatientMutation.mutateAsync({
        id: patient.id,
        patientData: submitData,
      });
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Error updating patient:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar Paciente</DialogTitle>
          <DialogDescription>
            Modifica la información del paciente. Los campos marcados con * son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Nombre <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="Juan"
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Apellido <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Pérez"
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="juan.perez@email.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+1234567890"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Tipo de Documento <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="documentType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dni">DNI</SelectItem>
                          <SelectItem value="carnet_extranjeria">
                            Carnet de Extranjería
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.documentType && (
                    <p className="text-sm text-red-500">
                      {errors.documentType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentNumber">
                    Número de Documento <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="documentNumber"
                    {...register("documentNumber")}
                    placeholder="12345678"
                    aria-invalid={!!errors.documentNumber}
                  />
                  {errors.documentNumber && (
                    <p className="text-sm text-red-500">
                      {errors.documentNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Nacimiento</Label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "d 'de' MMMM 'de' yyyy", {
                                  locale: es,
                                })
                              : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Género</Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar género" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Femenino</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <Controller
                name="gender"
                control={control}
                render={({ field: genderField }) => (
                  <div className="space-y-4">
                    {genderField.value === "female" && (
                      <div className="space-y-2">
                        <Label>¿Está embarazada?</Label>
                        <Controller
                          name="isPregnant"
                          control={control}
                          render={({ field: pregnantField }) => (
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="isPregnant"
                                checked={pregnantField.value || false}
                                onCheckedChange={pregnantField.onChange}
                              />
                              <Label
                                htmlFor="isPregnant"
                                className="text-sm font-normal"
                              >
                                {pregnantField.value ? "Sí" : "No"}
                              </Label>
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea
                  id="address"
                  {...register("address")}
                  placeholder="123 Main St, City, Country"
                  rows={2}
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Médica</h3>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Historial Médico</Label>
                <Textarea
                  id="medicalHistory"
                  {...register("medicalHistory")}
                  placeholder="Hipertensión, diabetes tipo 2..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  {...register("allergies")}
                  placeholder="Penicilina, maní..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="El paciente prefiere citas por la mañana..."
                  rows={3}
                />
              </div>
            </div>
          </form>
        </ScrollArea>

        {/* Dialog Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={updatePatientMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={updatePatientMutation.isPending}
          >
            {updatePatientMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Actualizar Paciente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
