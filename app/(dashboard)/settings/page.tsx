"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  UserCheck
} from "lucide-react";
import { useCurrentTenant, useTenantUsers } from "@/hooks/useTenants";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function SettingsPage() {
  const { data: tenant, isLoading: isLoadingTenant } = useCurrentTenant();
  const { data: users, isLoading: isLoadingUsers } = useTenantUsers();

  if (isLoadingTenant) {
    return (
      <div className="container mx-auto py-6 px-6">
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
    <div className="container mx-auto py-6 px-6">
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
                <Badge variant={tenant?.status === 'active' ? 'default' : 'secondary'}>
                  {tenant?.status === 'active' ? 'Activo' : 'Inactivo'}
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
                    Vence: {tenant?.expirationDate 
                      ? format(new Date(tenant.expirationDate), "dd 'de' MMMM, yyyy", { locale: es })
                      : 'No especificado'
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Membership */}
          {tenant?.currentMembership && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-green-500" />
                  Membresía Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{tenant.currentMembership.membership.name}</h3>
                  <p className="text-sm text-muted-foreground">{tenant.currentMembership.membership.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Precio:</span>
                    <p className="font-medium">${tenant.currentMembership.membership.price}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duración:</span>
                    <p className="font-medium">{tenant.currentMembership.membership.durationMonths} mes{tenant.currentMembership.membership.durationMonths !== 1 ? 'es' : ''}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Máx. Usuarios:</span>
                    <p className="font-medium">{tenant.currentMembership.membership.maxUsers}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Máx. Pacientes:</span>
                    <p className="font-medium">{tenant.currentMembership.membership.maxPatients}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Período:</span>
                  <p className="text-sm">
                    {format(new Date(tenant.currentMembership.startDate), "dd/MM/yyyy")} - {format(new Date(tenant.currentMembership.endDate), "dd/MM/yyyy")}
                  </p>
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
          </div>

          <div className="space-y-4">
            {isLoadingUsers ? (
              <>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </>
            ) : (
              users?.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-muted">
                          {user.userType === 'tenant_owner' ? (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {user.profile.firstName} {user.profile.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{user.profile.email}</p>
                          {user.userRoles.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {user.userRoles.map((userRole) => (
                                <Badge key={userRole.id} variant="outline" className="text-xs">
                                  {userRole.role.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge variant={user.userType === 'tenant_owner' ? 'default' : 'secondary'}>
                        {user.userType === 'tenant_owner' ? 'Propietario' : 'Usuario'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}