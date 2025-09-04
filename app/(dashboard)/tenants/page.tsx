"use client";

import React, { useState } from "react";
import { useTenants } from "@/hooks/useTenants";
import { useDebounce } from "@/hooks/useDebounce";
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
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { CreateTenantDialog } from "@/components/tenants/create-tenant-dialog";
import { EditTenantDialog } from "@/components/tenants/edit-tenant-dialog";
import { DeleteTenantDialog } from "@/components/tenants/delete-tenant-dialog";
import { AssignOwnerDialog } from "@/components/tenants/assign-owner-dialog";
import { AssignMembershipDialog } from "@/components/tenants/assign-membership-dialog";
import {
  Building2,
  Filter,
  Loader2,
  Edit,
  Trash2,
  UserPlus,
  ChevronDown,
  ChevronRight,
  User,
  Crown,
  Shield,
  Search,
  CreditCard,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 350);
  const [editTenantId, setEditTenantId] = useState<string | null>(null);
  const [deleteTenantId, setDeleteTenantId] = useState<string | null>(null);
  const [deleteTenantName, setDeleteTenantName] = useState<string>("");
  const [assignOwnerTenantId, setAssignOwnerTenantId] = useState<string | null>(null);
  const [assignMembershipTenantId, setAssignMembershipTenantId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assignOwnerDialogOpen, setAssignOwnerDialogOpen] = useState(false);
  const [assignMembershipDialogOpen, setAssignMembershipDialogOpen] = useState(false);
  const [expandedTenants, setExpandedTenants] = useState<Set<string>>(new Set());

  const queryParams = {
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(debouncedSearchQuery.trim() && { search: debouncedSearchQuery.trim() })
  };
  const { data: tenants, isLoading, error } = useTenants(queryParams);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as TenantStatus | "all");
  };

  const handleUpdate = (id: string) => {
    setEditTenantId(id);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteTenantId(id);
    setDeleteTenantName(name);
    setDeleteDialogOpen(true);
  };

  const handleAssignOwner = (id: string) => {
    setAssignOwnerTenantId(id);
    setAssignOwnerDialogOpen(true);
  };

  const handleAssignMembership = (id: string) => {
    setAssignMembershipTenantId(id);
    setAssignMembershipDialogOpen(true);
  };

  const toggleExpanded = (tenantId: string) => {
    const newExpanded = new Set(expandedTenants);
    if (newExpanded.has(tenantId)) {
      newExpanded.delete(tenantId);
    } else {
      newExpanded.add(tenantId);
    }
    setExpandedTenants(newExpanded);
  };

  const getUserTypeIcon = (userType: string) => {
    return userType === 'tenant_owner' ? (
      <Crown className="h-4 w-4 text-yellow-500" />
    ) : (
      <User className="h-4 w-4 text-blue-500" />
    );
  };

  const getUserTypeBadge = (userType: string) => {
    return userType === 'tenant_owner' ? (
      <Badge variant="default" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        Propietario
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
        Usuario
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Consultorios</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Error al cargar los consultorios. Por favor intenta nuevamente.
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
          <h1 className="text-3xl font-bold">Consultorios</h1>
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
              <label className="text-sm font-medium">Buscar por nombre</label>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar consultorio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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
            Lista de Consultorios
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
            <div className="rounded-lg border border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 border-b">
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="font-semibold">Consultorio</TableHead>
                    <TableHead className="font-semibold">Contacto</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold">Usuarios</TableHead>
                    <TableHead className="text-center font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants && tenants.length > 0 ? (
                    tenants.map((tenant) => (
                      <React.Fragment key={tenant.id}>
                        <TableRow className="hover:bg-primary/5 border-b transition-colors">
                          <TableCell className="w-8">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpanded(tenant.id)}
                              className="h-8 w-8 p-0 hover:bg-primary/10"
                            >
                              {expandedTenants.has(tenant.id) ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="space-y-1">
                              <div className="font-semibold text-foreground">{tenant.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                                {tenant.address}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-foreground">{tenant.email}</div>
                              <div className="text-sm text-muted-foreground">{tenant.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={statusMap[tenant.status].variant}
                              className="font-medium"
                            >
                              {statusMap[tenant.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-foreground">
                                {tenant.users.length} usuario{tenant.users.length !== 1 ? 's' : ''}
                              </div>
                              <div className="flex -space-x-1">
                                {tenant.users.slice(0, 3).map((user) => (
                                  <Avatar
                                    key={user.id}
                                    className="w-6 h-6 border-2 border-background"
                                    title={`${user.profile.firstName} ${user.profile.lastName}`}
                                  >
                                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-xs font-medium text-primary-foreground">
                                      {user.profile.firstName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {tenant.users.length > 3 && (
                                  <Avatar className="w-6 h-6 border-2 border-background">
                                    <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                                      +{tenant.users.length - 3}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      color="info"
                                      size="sm"
                                      onClick={() => handleUpdate(tenant.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent color="info">
                                    <p>Actualizar consultorio</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      color="warning"
                                      size="sm"
                                      onClick={() => handleAssignOwner(tenant.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <UserPlus className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent color="warning">
                                    <p>Asignar propietario</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      color="success"
                                      size="sm"
                                      onClick={() => handleAssignMembership(tenant.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <CreditCard className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent color="success">
                                    <p>Asignar membresía</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      color="danger"
                                      size="sm"
                                      onClick={() =>
                                        handleDelete(tenant.id, tenant.name)
                                      }
                                      className="h-8 w-8 p-0"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent color="danger">
                                    <p>Eliminar consultorio</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                        
                        {/* Expanded row with user details */}
                        {expandedTenants.has(tenant.id) && (
                          <TableRow className="bg-muted/20">
                            <TableCell colSpan={6} className="p-0">
                              <div className="px-6 py-4 border-t">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                                    <User className="h-4 w-4" />
                                    Usuarios del Consultorio
                                  </div>
                                  
                                  <div className="grid gap-3">
                                    {tenant.users.map((user) => (
                                      <div 
                                        key={user.id} 
                                        className="bg-background rounded-lg border border-border p-4 shadow-sm hover:bg-primary/5 transition-colors"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex items-start gap-3">
                                            <Avatar className="w-10 h-10">
                                              <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-sm font-semibold text-primary-foreground">
                                                {user.profile.firstName.charAt(0).toUpperCase()}{user.profile.lastName.charAt(0).toUpperCase()}
                                              </AvatarFallback>
                                            </Avatar>
                                            
                                            <div className="flex-1 space-y-1">
                                              <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-foreground">
                                                  {user.profile.firstName} {user.profile.lastName}
                                                </h4>
                                                {getUserTypeIcon(user.userType)}
                                                {getUserTypeBadge(user.userType)}
                                              </div>
                                              
                                              <div className="text-sm text-muted-foreground">
                                                {user.profile.email}
                                              </div>
                                              
                                              {user.profile.phone && (
                                                <div className="text-sm text-muted-foreground">
                                                  {user.profile.phone}
                                                </div>
                                              )}
                                              
                                              <div className="text-xs text-muted-foreground">
                                                @{user.username}
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="text-right">
                                            <div className="space-y-1">
                                              {user.roles.map((role, roleIndex) => (
                                                <div key={roleIndex} className="flex items-center gap-1">
                                                  {role.isTenantAdmin && (
                                                    <Shield className="h-3 w-3 text-green-500" />
                                                  )}
                                                  <Badge 
                                                    variant={role.isTenantAdmin ? "default" : "secondary"}
                                                    className="text-xs"
                                                  >
                                                    {role.name}
                                                  </Badge>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {user.roles.some(role => role.description) && (
                                          <div className="mt-3 pt-3 border-t border-border">
                                            {user.roles.map((role, roleIndex) => (
                                              role.description && (
                                                <p key={roleIndex} className="text-xs text-muted-foreground">
                                                  <span className="font-medium">{role.name}:</span> {role.description}
                                                </p>
                                              )
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Building2 className="h-8 w-8 text-muted-foreground/60" />
                          <div className="text-sm font-medium">No se encontraron consultorios</div>
                          <div className="text-xs">No hay consultorios que coincidan con los filtros seleccionados.</div>
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

      {/* Dialogs */}
      <EditTenantDialog
        tenantId={editTenantId}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      <DeleteTenantDialog
        tenantId={deleteTenantId}
        tenantName={deleteTenantName}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />

      <AssignOwnerDialog
        tenantId={assignOwnerTenantId}
        open={assignOwnerDialogOpen}
        onOpenChange={setAssignOwnerDialogOpen}
      />

      <AssignMembershipDialog
        tenantId={assignMembershipTenantId}
        open={assignMembershipDialogOpen}
        onOpenChange={setAssignMembershipDialogOpen}
      />
    </div>
  );
}
