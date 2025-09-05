"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Building2, Users, Shield } from "lucide-react";

export default function SettingsPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="h-6 w-6 text-blue-500" />
              Mi Perfil
            </CardTitle>
            <CardDescription>
              Administra tu información personal y preferencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próximamente disponible
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-green-500" />
              Consultorio
            </CardTitle>
            <CardDescription>
              Configura los datos de tu consultorio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próximamente disponible
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-500" />
              Usuarios
            </CardTitle>
            <CardDescription>
              Gestiona los usuarios de tu consultorio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próximamente disponible
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-orange-500" />
              Seguridad
            </CardTitle>
            <CardDescription>
              Configuraciones de seguridad y privacidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próximamente disponible
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}