"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import Select from "react-select";
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
  Select as ShadcnSelect,
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
import { CalendarIcon, Loader2, User, UserCheck } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useUpdateAppointment,
  useAppointmentDetail,
} from "@/hooks/useAppointments";
import { usePatientsSelect } from "@/hooks/usePatients";
import { useUsersSelect } from "@/hooks/useUsers";
import type { UpdateAppointmentData } from "@/services/appointment.service";

const editAppointmentSchema = z.object({
  appointmentDate: z.date({
    error: "La fecha de la cita es requerida",
  }),
  appointmentTime: z
    .string()
    .min(1, "La hora de la cita es requerida")
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Formato de hora inválido (HH:MM)"
    ),
  consultationType: z.enum(
    ["initial", "followup", "nutritional_plan", "medical_checkup", "emergency"],
    {
      message: "El tipo de consulta es requerido",
    }
  ),
  durationMinutes: z
    .number()
    .min(15, "La duración mínima es 15 minutos")
    .max(240, "La duración máxima es 4 horas"),
  patientId: z.string().min(1, "Debe seleccionar un paciente"),
  nutritionistId: z.string().min(1, "Debe seleccionar un nutricionista"),
  status: z.enum(
    [
      "scheduled",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
      "no_show",
      "rescheduled",
    ],
    {
      message: "El estado es requerido",
    }
  ),
  notes: z.string().optional(),
});

type EditAppointmentFormData = z.infer<typeof editAppointmentSchema>;

interface EditAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string | null;
}

export function EditAppointmentDialog({
  open,
  onOpenChange,
  appointmentId,
}: EditAppointmentDialogProps) {
  const updateAppointmentMutation = useUpdateAppointment();

  // Fetch appointment details
  const { data: appointmentData, isLoading: isLoadingAppointment } =
    useAppointmentDetail(appointmentId);

  // Fetch patients and nutritionists for selects
  const { data: patients } = usePatientsSelect();
  const { data: users } = useUsersSelect();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditAppointmentFormData>({
    resolver: zodResolver(editAppointmentSchema),
  });

  // Parse date string safely
  const parseDateString = (dateString: string): Date => {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    return parseISO(dateString);
  };

  // // Load appointment data into form
  useEffect(() => {
    if (appointmentData) {
      const appointmentDate = parseDateString(appointmentData.appointmentDate);

      // Use reset to populate all form fields
      reset({
        appointmentDate,
        appointmentTime: appointmentData.appointmentTime.slice(0, 5), // Remove seconds
        consultationType: appointmentData.consultationType,
        durationMinutes: appointmentData.durationMinutes,
        patientId: appointmentData.patient.id,
        nutritionistId: appointmentData.nutritionist.id,
        status: appointmentData.status,

        notes: appointmentData.notes || "",
      });
    }
  }, [appointmentData, reset]);

  const onSubmit = async (data: EditAppointmentFormData) => {
    if (!appointmentId) return;

    try {
      const submitData: UpdateAppointmentData = {
        appointmentDate: format(data.appointmentDate, "yyyy-MM-dd"),
        appointmentTime: data.appointmentTime,
        consultationType: data.consultationType,
        durationMinutes: data.durationMinutes,
        patientId: data.patientId,
        nutritionistId: data.nutritionistId,
        status: data.status,
        notes: data.notes,
      };

      await updateAppointmentMutation.mutateAsync({
        id: appointmentId,
        appointmentData: submitData,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  // Transform patients data for react-select
  const patientOptions =
    patients?.map((patient) => ({
      value: patient.id,
      label: patient.name,
    })) || [];

  // Transform users data for react-select (nutritionists)
  const nutritionistOptions =
    users?.map((user) => ({
      value: user.id,
      label: user.name,
    })) || [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        key={appointmentId}
        className="sm:max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <DialogHeader>
          <DialogTitle>Editar Cita</DialogTitle>
          <DialogDescription>
            Modifica la información de la cita. Los campos marcados con * son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        {isLoadingAppointment ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Cargando datos de la cita...</span>
          </div>
        ) : (
          <ScrollArea className="max-h-[60vh] overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pr-4">
              {/* Date and Time Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Fecha y Hora
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>
                      Fecha <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="appointmentDate"
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
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {errors.appointmentDate && (
                      <p className="text-sm text-red-500">
                        {errors.appointmentDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime">
                      Hora <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      {...register("appointmentTime")}
                      aria-invalid={!!errors.appointmentTime}
                    />
                    {errors.appointmentTime && (
                      <p className="text-sm text-red-500">
                        {errors.appointmentTime.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Duración (minutos) <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="durationMinutes"
                      control={control}
                      render={({ field }) => (
                        <ShadcnSelect
                          value={appointmentData?.durationMinutes.toString()}
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar duración" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutos</SelectItem>
                            <SelectItem value="45">45 minutos</SelectItem>
                            <SelectItem value="60">1 hora</SelectItem>
                            <SelectItem value="90">1.5 horas</SelectItem>
                            <SelectItem value="120">2 horas</SelectItem>
                          </SelectContent>
                        </ShadcnSelect>
                      )}
                    />
                    {errors.durationMinutes && (
                      <p className="text-sm text-red-500">
                        {errors.durationMinutes.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* People Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Participantes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      Paciente <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="patientId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={patientOptions}
                          placeholder="Buscar paciente..."
                          isSearchable
                          isClearable
                          onChange={(option) =>
                            field.onChange(option?.value || "")
                          }
                          value={
                            patientOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                        />
                      )}
                    />
                    {errors.patientId && (
                      <p className="text-sm text-red-500">
                        {errors.patientId.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Nutricionista <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="nutritionistId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={nutritionistOptions}
                          placeholder="Buscar nutricionista..."
                          isSearchable
                          isClearable
                          onChange={(option) =>
                            field.onChange(option?.value || "")
                          }
                          value={
                            nutritionistOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                        />
                      )}
                    />
                    {errors.nutritionistId && (
                      <p className="text-sm text-red-500">
                        {errors.nutritionistId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Consultation Details */}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Detalles de la Consulta
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      Tipo de Consulta <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="consultationType"
                      control={control}
                      render={({ field }) => (
                        <ShadcnSelect
                          value={
                            field.value || appointmentData?.consultationType
                          }
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar tipo de consulta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="initial">
                              Consulta Inicial
                            </SelectItem>
                            <SelectItem value="followup">
                              Seguimiento
                            </SelectItem>
                            <SelectItem value="nutritional_plan">
                              Plan Nutricional
                            </SelectItem>
                            <SelectItem value="medical_checkup">
                              Revisión Médica
                            </SelectItem>
                            <SelectItem value="emergency">
                              Emergencia
                            </SelectItem>
                          </SelectContent>
                        </ShadcnSelect>
                      )}
                    />
                    {errors.consultationType && (
                      <p className="text-sm text-red-500">
                        {errors.consultationType.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Estado <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <ShadcnSelect
                          value={field.value || appointmentData?.status}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">
                              Programada
                            </SelectItem>
                            <SelectItem value="confirmed">
                              Confirmada
                            </SelectItem>
                            <SelectItem value="in_progress">
                              En progreso
                            </SelectItem>
                            <SelectItem value="completed">
                              Completada
                            </SelectItem>
                            <SelectItem value="cancelled">Cancelada</SelectItem>
                            <SelectItem value="no_show">No asistió</SelectItem>
                            <SelectItem value="rescheduled">
                              Reprogramada
                            </SelectItem>
                          </SelectContent>
                        </ShadcnSelect>
                      )}
                    />
                    {errors.status && (
                      <p className="text-sm text-red-500">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    placeholder="Información adicional sobre la cita, objetivos específicos, etc."
                    rows={3}
                  />
                </div>
              </div>

              {/* Dialog Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={updateAppointmentMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={updateAppointmentMutation.isPending}
                >
                  {updateAppointmentMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Actualizar Cita
                </Button>
              </div>
            </form>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
