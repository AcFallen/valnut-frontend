"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Settings,
  User,
  Building2,
  Users,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Crown,
  UserCheck,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { useCurrentTenant, useTenantUsers } from "@/hooks/useTenants";
import { CreateUserDialog } from "@/components/settings/create-user-dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function SettingsPage() {
  const { data: tenant, isLoading: isLoadingTenant } = useCurrentTenant();
  const { data: users, isLoading: isLoadingUsers } = useTenantUsers();
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);

  if (isLoadingTenant) {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Configuración
              </h1>
              <p className="text-muted-foreground">
                Gestiona la configuración de tu consultorio
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
            <p className="text-muted-foreground">
              Gestiona la configuración de tu consultorio
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Tenant Information */}
        <div className="space-y-6">
          {/* Tenant Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                Información del Consultorio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{tenant?.name}</h3>
                <Badge
                  variant={
                    tenant?.status === "active" ? "default" : "secondary"
                  }
                >
                  {tenant?.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant?.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant?.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Vence:{" "}
                    {tenant?.expirationDate
                      ? format(
                          new Date(tenant.expirationDate),
                          "dd 'de' MMMM, yyyy",
                          { locale: es }
                        )
                      : "No especificado"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Membership */}
          {tenant?.currentMembership ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-green-500" />
                  Membresía Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {tenant.currentMembership.membership.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tenant.currentMembership.membership.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Precio:</span>
                    <p className="font-medium">
                      ${tenant.currentMembership.membership.price}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duración:</span>
                    <p className="font-medium">
                      {tenant.currentMembership.membership.durationMonths} mes
                      {tenant.currentMembership.membership.durationMonths !== 1
                        ? "es"
                        : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Máx. Usuarios:
                    </span>
                    <p className="font-medium">
                      {tenant.currentMembership.membership.maxUsers}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Máx. Pacientes:
                    </span>
                    <p className="font-medium">
                      {tenant.currentMembership.membership.maxPatients}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">
                    Período:
                  </span>
                  <p className="text-sm">
                    {format(
                      new Date(tenant.currentMembership.startDate),
                      "dd/MM/yyyy"
                    )}{" "}
                    -{" "}
                    {format(
                      new Date(tenant.currentMembership.endDate),
                      "dd/MM/yyyy"
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-700 justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Sin Membresía Activa
                </CardTitle>
                <CardDescription className="text-orange-600 text-center">
                  Actualmente no tienes una membresía activa en tu consultorio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-sm text-orange-700 mb-4">
                    Para acceder a todas las funcionalidades y gestionar tu
                    consultorio sin limitaciones, necesitas activar una
                    membresía.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-orange-600">
                    <CreditCard className="h-4 w-4" />
                    <span>Contacta a soporte para solicitar una membresía</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Users */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6" />
              Usuarios ({users?.length || 0})
            </h2>
            <Button
              onClick={() => setIsCreateUserDialogOpen(true)}
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Agregar Usuario
            </Button>
          </div>

          <div className="space-y-3">
            {isLoadingUsers ? (
              <>
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </>
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <Card
                  key={user.id}
                  className="overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {user.userType === "tenant_owner" ? (
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                              <Crown className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                              <UserCheck className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">
                            {user.profile.firstName} {user.profile.lastName}
                          </h3>
                          <Badge
                            variant={
                              user.userType === "tenant_owner"
                                ? "default"
                                : "secondary"
                            }
                            className={`text-xs px-2.5 py-1 font-medium ${
                              user.userType === "tenant_owner"
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                                : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0"
                            }`}
                          >
                            {user.userType === "tenant_owner"
                              ? "Propietario"
                              : "Usuario"}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {user.profile.email}
                          </p>
                        </div>

                        {user.userRoles.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Shield className="h-3.5 w-3.5 text-gray-400" />
                            <div className="flex gap-1">
                              {user.userRoles.map((userRole) => (
                                <Badge
                                  key={userRole.id}
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 bg-white/80 border-gray-200 text-gray-700 dark:bg-gray-800/80 dark:border-gray-600 dark:text-gray-300"
                                >
                                  {userRole.role.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                      <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        No hay usuarios registrados
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4">
                        Comienza agregando usuarios a tu consultorio para
                        gestionar el equipo
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsCreateUserDialogOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Agregar Primer Usuario
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <CreateUserDialog
        open={isCreateUserDialogOpen}
        onOpenChange={setIsCreateUserDialogOpen}
      />
    </div>
  );
}
