"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Calculator,
  FileText,
  Save,
  Ruler,
  Weight,
  Brain,
  TrendingUp,
  Stethoscope,
} from "lucide-react";
interface UnderFiveFormProps {
  patientId: string;
}

export function UnderFiveForm({ patientId }: UnderFiveFormProps) {
  return (
    <div className="space-y-6">
      {/* Grid principal - 2 columnas en md */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-6">
          {/* Datos Antropométricos */}
          <Card className="border-2 border-purple-100 dark:border-purple-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Weight className="h-5 w-5" />
                Datos Antropométricos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="peso" className="flex items-center gap-1">
                    <Weight className="h-4 w-4" />
                    Peso
                  </Label>
                  <div className="flex">
                    <Input
                      id="peso"
                      placeholder="14"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm">
                      kg
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="talla" className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    Talla
                  </Label>
                  <div className="flex">
                    <Input
                      id="talla"
                      placeholder="80"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm">
                      cm
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pesoRopa">Peso Ropa</Label>
                  <div className="flex">
                    <Input
                      id="pesoRopa"
                      placeholder="0.5"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm">
                      kg
                    </div>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="perimetroCraneal"
                    className="flex items-center gap-1"
                  >
                    <Brain className="h-4 w-4" />
                    Perímetro Craneal
                  </Label>
                  <div className="flex">
                    <Input
                      id="perimetroCraneal"
                      placeholder="52"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm">
                      cm
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnóstico Nutricional según Indicadores */}
          <Card className="border-2 border-emerald-100 dark:border-emerald-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <TrendingUp className="h-5 w-5" />
                Diagnóstico Nutricional según Indicadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="longitudTallaEdad">Longitud-talla/Edad</Label>
                <Input id="longitudTallaEdad" placeholder="TALLA BAJA SEVERA" />
              </div>

              <div>
                <Label htmlFor="pesoEdad">Peso/Edad</Label>
                <Input id="pesoEdad" placeholder="NORMAL" />
              </div>

              <div>
                <Label htmlFor="pesoLongitudTalla">Peso/Longitud-talla</Label>
                <Input id="pesoLongitudTalla" placeholder="SOBREPESO" />
              </div>

              <div className="pt-2">
                <Label
                  htmlFor="conclusionDiagnostico"
                  className="text-base font-semibold"
                >
                  CONCLUSIÓN DE DIAGNÓSTICO
                </Label>
                <Textarea
                  id="conclusionDiagnostico"
                  placeholder="Ingrese la conclusión del diagnóstico..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="space-y-6">
          {/* Exámenes Auxiliares */}
          <Card className="border-2 border-indigo-100 dark:border-indigo-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Stethoscope className="h-5 w-5" />
                Exámenes Auxiliares
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hemoglobina">Hemoglobina</Label>
                  <div className="flex">
                    <Input
                      id="hemoglobina"
                      placeholder="13.5"
                      className="rounded-r-none"
                    />
                    <div className="px-2 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-xs">
                      mg/dl
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="altura">Altura</Label>
                  <div className="flex">
                    <Input
                      id="altura"
                      placeholder="4000"
                      className="rounded-r-none"
                    />
                    <div className="px-2 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-xs">
                      m.s.n.m
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ajustePorAltura">Ajuste por Altura</Label>
                  <Input id="ajustePorAltura" placeholder="3.00" />
                </div>
                <div>
                  <Label htmlFor="hemoglobinaCorregida">
                    Hemoglobina Corregida
                  </Label>
                  <div className="flex">
                    <Input
                      id="hemoglobinaCorregida"
                      placeholder="10.00"
                      className="rounded-r-none"
                    />
                    <div className="px-2 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-xs">
                      mg/dl
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="conclusion">Conclusión</Label>
                <Input id="conclusion" placeholder="ANEMIA LEVE" />
              </div>

              <div>
                <Label htmlFor="sugerenciaTratamiento">
                  Sugerencia de Tratamiento
                </Label>
                <Textarea
                  id="sugerenciaTratamiento"
                  placeholder="3 mg/Kg/día, Máxima dosis 70mg/día..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Indicaciones */}
          <Card className="border-2 border-rose-100 dark:border-rose-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                <FileText className="h-5 w-5" />
                Indicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="brindarlafatitvitasedfasdy"
                rows={4}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">Cancelar</Button>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Guardar Consulta
        </Button>
      </div>
    </div>
  );
}
