"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addMonths, format } from "date-fns";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, Users, Calendar, Check } from "lucide-react";
import { useMemberships, useAssignMembership } from "@/hooks/useMemberships";
import { Membership } from "@/types/membership";

const assignMembershipSchema = z.object({
  membershipId: z.string().min(1, "Debe seleccionar una membresía"),
  startDate: z.date(),
  endDate: z.date(),
  amountPaid: z.number().min(0, "El monto debe ser mayor o igual a 0"),
  paymentMethod: z.string().min(1, "Debe seleccionar un método de pago"),
  paymentStatus: z.string().min(1, "Debe seleccionar el estado del pago"),
  notes: z.string(),
  transactionReference: z
    .string()
    .min(1, "La referencia de transacción es requerida"),
});

type AssignMembershipForm = z.infer<typeof assignMembershipSchema>;

interface AssignMembershipDialogProps {
  tenantId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentMethods = [
  { value: "manual_assignment", label: "Asignación Manual" },
  { value: "credit_card", label: "Tarjeta de Crédito" },
  { value: "bank_transfer", label: "Transferencia Bancaria" },
  { value: "cash", label: "Efectivo" },
];

const paymentStatuses = [
  { value: "paid", label: "Pagado" },
  { value: "pending", label: "Pendiente" },
  { value: "failed", label: "Fallido" },
];

export function AssignMembershipDialog({
  tenantId,
  open,
  onOpenChange,
}: AssignMembershipDialogProps) {
  const [selectedMembership, setSelectedMembership] =
    useState<Membership | null>(null);

  const { data: memberships, isLoading: loadingMemberships } = useMemberships();
  const assignMembershipMutation = useAssignMembership();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AssignMembershipForm>({
    resolver: zodResolver(assignMembershipSchema),
    defaultValues: {
      membershipId: "",
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      amountPaid: 0,
      paymentMethod: "manual_assignment",
      paymentStatus: "paid",
      notes: "Asignación manual por admin",
      transactionReference: `MANUAL-${Date.now()}`,
    },
  });

  const watchedMembershipId = watch("membershipId");
  const watchedStartDate = watch("startDate");

  // Update selected membership when membershipId changes
  useEffect(() => {
    if (watchedMembershipId && memberships) {
      const membership = memberships.find(
        (m: Membership) => m.id === watchedMembershipId
      );
      setSelectedMembership(membership || null);

      if (membership) {
        setValue("amountPaid", parseFloat(membership.price));
        // Update end date based on membership duration
        if (watchedStartDate) {
          const endDate = addMonths(
            watchedStartDate,
            membership.durationMonths
          );
          setValue("endDate", endDate);
        }
      }
    }
  }, [watchedMembershipId, memberships, setValue]);

  // Update end date when start date changes
  useEffect(() => {
    if (watchedStartDate && selectedMembership) {
      const endDate = addMonths(
        watchedStartDate,
        selectedMembership.durationMonths
      );
      setValue("endDate", endDate);
    }
  }, [watchedStartDate, selectedMembership, setValue]);

  const onSubmit = async (data: AssignMembershipForm) => {
    if (!tenantId) return;

    try {
      const payload = {
        ...data,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        paymentDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      };

      await assignMembershipMutation.mutateAsync({
        tenantId,
        data: payload,
      });

      toast.success("Membresía asignada exitosamente");
      onOpenChange(false);
      reset();
      setSelectedMembership(null);
    } catch (error: any) {
      console.error("Error assigning membership:", error);
      toast.error(
        error.response?.data?.message || "Error al asignar membresía"
      );
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
    setSelectedMembership(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Asignar Membresía</DialogTitle>
          <DialogDescription>
            Seleccione una membresía y configure los detalles de asignación para
            el consultorio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-1 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="membershipId" className="text-sm font-medium">
                  Membresía
                </Label>
                <Controller
                  name="membershipId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loadingMemberships}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar membresía" />
                      </SelectTrigger>
                      <SelectContent>
                        {memberships?.map((membership: Membership) => (
                          <SelectItem key={membership.id} value={membership.id}>
                            {membership.name} - ${membership.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.membershipId && (
                  <p className="text-sm text-red-500">
                    {errors.membershipId.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    Fecha de Inicio
                  </Label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                        placeholder="Seleccionar fecha de inicio"
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="endDate" className="text-sm font-medium">
                    Fecha de Fin
                  </Label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                        placeholder="Seleccionar fecha de fin"
                        disabled
                      />
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="amountPaid" className="text-sm font-medium">
                  Monto Pagado
                </Label>
                <Controller
                  name="amountPaid"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="amountPaid"
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  )}
                />
                {errors.amountPaid && (
                  <p className="text-sm text-red-500">
                    {errors.amountPaid.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="paymentMethod"
                    className="text-sm font-medium"
                  >
                    Método de Pago
                  </Label>
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar método" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-500">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="paymentStatus"
                    className="text-sm font-medium"
                  >
                    Estado del Pago
                  </Label>
                  <Controller
                    name="paymentStatus"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.paymentStatus && (
                    <p className="text-sm text-red-500">
                      {errors.paymentStatus.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="transactionReference"
                  className="text-sm font-medium"
                >
                  Referencia de Transacción
                </Label>
                <Input
                  id="transactionReference"
                  {...register("transactionReference")}
                  placeholder="MANUAL-001"
                />
                {errors.transactionReference && (
                  <p className="text-sm text-red-500">
                    {errors.transactionReference.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notas
                </Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Notas adicionales sobre la asignación..."
                  rows={3}
                />
                {errors.notes && (
                  <p className="text-sm text-red-500">{errors.notes.message}</p>
                )}
              </div>
            </div>

            {/* Right Column - Membership Details */}
            <div className="space-y-4">
              {selectedMembership ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {selectedMembership.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {selectedMembership.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Precio</div>
                        <div className="text-2xl font-bold text-primary">
                          ${selectedMembership.price}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Duración</div>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4" />
                          {selectedMembership.durationMonths} mes
                          {selectedMembership.durationMonths !== 1 ? "es" : ""}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Máx. Usuarios</div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4" />
                          {selectedMembership.maxUsers}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          Máx. Pacientes
                        </div>
                        <div className="text-sm">
                          {selectedMembership.maxPatients}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">
                        Características
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(selectedMembership.features).map(
                          ([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              {value ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-muted" />
                              )}
                              <span className="text-xs">
                                {key === "apiAccess" && "API Access"}
                                {key === "mealPlans" && "Planes de Comida"}
                                {key === "basicReports" && "Reportes Básicos"}
                                {key === "advancedReports" &&
                                  "Reportes Avanzados"}
                                {key === "patientManagement" &&
                                  "Gestión de Pacientes"}
                                {key === "appointmentScheduling" &&
                                  "Programación de Citas"}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center text-muted-foreground">
                      <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Seleccione una membresía para ver los detalles</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                assignMembershipMutation.isPending || !selectedMembership
              }
            >
              {assignMembershipMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Asignar Membresía
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
