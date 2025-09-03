"use client";

import { useState } from "react";
import { useTenants } from "@/hooks/useTenants";
import { TenantStatus } from "@/types/tenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateTenantDialog } from "@/components/tenants/create-tenant-dialog";
import { Building2, Filter, Loader2, Edit, Trash2, UserPlus } from "lucide-react";

const statusMap: Record<
  TenantStatus,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  active: { label: "Activo", variant: "default" },
  inactive: { label: "Inactivo", variant: "secondary" },
  suspended: { label: "Suspendido", variant: "destructive" },
};

export default function TenantsPage() {
  const [statusFilter, setStatusFilter] = useState<TenantStatus | "all">(
    "active"
  );

  const queryParams = statusFilter === "all" ? {} : { status: statusFilter };
  const { data: tenants, isLoading, error } = useTenants(queryParams);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as TenantStatus | "all");
  };

  const handleUpdate = (id: string) => {
    console.log("Update tenant:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete tenant:", id);
  };

  const handleAssignOwner = (id: string) => {
    console.log("Assign owner to tenant:", id);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Error al cargar los clientes. Por favor intenta nuevamente.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>
        <CreateTenantDialog />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Estado</label>
              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                  <SelectItem value="suspended">Suspendidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Clientes
            {tenants && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({tenants.length} resultados)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Cargando tenants...</span>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Creado</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants && tenants.length > 0 ? (
                    tenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{tenant.name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {tenant.address}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{tenant.email}</TableCell>
                        <TableCell>{tenant.phone}</TableCell>
                        <TableCell>
                          <Badge variant={statusMap[tenant.status].variant}>
                            {statusMap[tenant.status].label}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(tenant.createdAt).toLocaleDateString(
                            "es-ES"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleUpdate(tenant.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Actualizar cliente</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleAssignOwner(tenant.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <UserPlus className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Asignar propietario</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(tenant.id)}
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Eliminar cliente</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="text-muted-foreground">
                          No se encontraron clientes con los filtros
                          seleccionados.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
