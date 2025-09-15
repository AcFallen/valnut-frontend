"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
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
import { ClipboardList, Save } from "lucide-react";

interface FoodHabitsQuestionnaireProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientData?: {
    firstName: string;
    lastName: string;
    address?: string;
    phone?: string;
  };
}

export function FoodHabitsQuestionnaire({
  open,
  onOpenChange,
  patientData,
}: FoodHabitsQuestionnaireProps) {
  const registrationNumber = "8354"; // This could be dynamic

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="6xl" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-3 text-xl text-cyan-600">
            <ClipboardList className="h-6 w-6" />
            Cuestionario de hábitos alimentarios
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Information */}
          <div className="bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                Módulo usuario
              </h2>
              <div className="text-right">
                <Label className="text-sm font-medium">N° Registro:</Label>
                <Input
                  value={registrationNumber}
                  className="w-20 mt-1 text-center font-semibold"
                  readOnly
                />
              </div>
            </div>

            {/* Patient Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Nombre(s):
                </Label>
                <Input
                  value={patientData?.firstName || "RODRIGO"}
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Apellidos:
                </Label>
                <Input
                  value={patientData?.lastName || "PEÑA CUADROS"}
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Dirección:
                </Label>
                <Input
                  value={patientData?.address || "LOS ROSALES 333"}
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Teléfono:
                </Label>
                <Input
                  value={patientData?.phone || "959262321"}
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Fecha:
                </Label>
                <Input
                  value="15/07/2025"
                  className="mt-1"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Sections Navigation */}
          <div className="flex gap-2 border-b">
            <Button
              variant="default"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-none border-b-2 border-pink-600"
            >
              SECCIÓN 1
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500 rounded-none"
              disabled
            >
              SECCIÓN 2
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500 rounded-none"
              disabled
            >
              SECCIÓN 3
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500 rounded-none"
              disabled
            >
              SECCIÓN 4
            </Button>
          </div>

          {/* Section 1 Questions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Label className="text-sm font-medium text-purple-600 min-w-[400px] leading-relaxed">
                  1a.- ¿Cuántos días a la semana comes verduras (al menos 100g - ejemplo: un pepino)?
                </Label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Elegir una opción..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 días</SelectItem>
                    <SelectItem value="1">1 día</SelectItem>
                    <SelectItem value="2">2 días</SelectItem>
                    <SelectItem value="3">3 días</SelectItem>
                    <SelectItem value="4">4 días</SelectItem>
                    <SelectItem value="5">5 días</SelectItem>
                    <SelectItem value="6">6 días</SelectItem>
                    <SelectItem value="7">7 días</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <Label className="text-sm font-medium text-purple-600 min-w-[400px] leading-relaxed">
                  1b.- Los días que sí comes verduras ¿Cuántas porciones consumes (de aproximadamente 100g - ejemplo: un pepino)?
                </Label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Elegir una opción..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 porción</SelectItem>
                    <SelectItem value="2">2 porciones</SelectItem>
                    <SelectItem value="3">3 porciones</SelectItem>
                    <SelectItem value="4">4 porciones</SelectItem>
                    <SelectItem value="5">5 o más porciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <Label className="text-sm font-medium text-purple-600 min-w-[400px] leading-relaxed">
                  2a.- ¿Cuántos días a la semana comes frutas (al menos 100g - ejemplo: una manzana mediana o una rebanada de sandía)?
                </Label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Elegir una opción..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 días</SelectItem>
                    <SelectItem value="1">1 día</SelectItem>
                    <SelectItem value="2">2 días</SelectItem>
                    <SelectItem value="3">3 días</SelectItem>
                    <SelectItem value="4">4 días</SelectItem>
                    <SelectItem value="5">5 días</SelectItem>
                    <SelectItem value="6">6 días</SelectItem>
                    <SelectItem value="7">7 días</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <Label className="text-sm font-medium text-purple-600 min-w-[400px] leading-relaxed">
                  2b.- Los días que sí comes frutas ¿Cuántas porciones consumes (al menos 100g - ejemplo: una manzana mediana o una rebanada de sandía)?
                </Label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Elegir una opción..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 porción</SelectItem>
                    <SelectItem value="2">2 porciones</SelectItem>
                    <SelectItem value="3">3 porciones</SelectItem>
                    <SelectItem value="4">4 porciones</SelectItem>
                    <SelectItem value="5">5 o más porciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <Label className="text-sm font-medium text-purple-600 min-w-[400px] leading-relaxed">
                  3.- ¿Cuántos días a la semana tomas leche sola, yogurt natural (al menos un vaso mediano) o queso?
                </Label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Elegir una opción..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 días</SelectItem>
                    <SelectItem value="1">1 día</SelectItem>
                    <SelectItem value="2">2 días</SelectItem>
                    <SelectItem value="3">3 días</SelectItem>
                    <SelectItem value="4">4 días</SelectItem>
                    <SelectItem value="5">5 días</SelectItem>
                    <SelectItem value="6">6 días</SelectItem>
                    <SelectItem value="7">7 días</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <Label className="text-sm font-medium text-purple-600 min-w-[400px] leading-relaxed">
                  4.- ¿Cuántos vasos de agua natural tomas al día?
                </Label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Elegir una opción..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 vasos</SelectItem>
                    <SelectItem value="1">1 vaso</SelectItem>
                    <SelectItem value="2">2 vasos</SelectItem>
                    <SelectItem value="3">3 vasos</SelectItem>
                    <SelectItem value="4">4 vasos</SelectItem>
                    <SelectItem value="5">5 vasos</SelectItem>
                    <SelectItem value="6">6 vasos</SelectItem>
                    <SelectItem value="7">7 vasos</SelectItem>
                    <SelectItem value="8">8 o más vasos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Label className="text-lg font-semibold">Resultados:</Label>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <Button className="bg-gray-600 hover:bg-gray-700">Evaluar</Button>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 border rounded-md min-h-[40px]"></div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button className="bg-gray-600 hover:bg-gray-700">Guardar</Button>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 border rounded-md min-h-[40px]"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Guardar Cuestionario
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}