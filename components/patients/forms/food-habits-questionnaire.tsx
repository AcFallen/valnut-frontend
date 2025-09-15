"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
}

export function FoodHabitsQuestionnaire({
  open,
  onOpenChange,
}: FoodHabitsQuestionnaireProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="6xl" className="max-h-[90vh]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-3 text-xl text-cyan-600">
            <ClipboardList className="h-6 w-6" />
            Cuestionario de hábitos alimentarios
          </DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>

        <ScrollArea className="max-h-[75vh] w-full">
          <div className="space-y-6 p-1">
            <Tabs defaultValue="seccion1" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="seccion1">Sección 1</TabsTrigger>
                <TabsTrigger value="seccion2">Sección 2</TabsTrigger>
                <TabsTrigger value="seccion3">Sección 3</TabsTrigger>
                <TabsTrigger value="seccion4">Sección 4</TabsTrigger>
              </TabsList>

              <TabsContent value="seccion1" className="space-y-6 mt-6">
                {/* Section 1 Questions */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm font-medium  leading-relaxed">
                        1a.- ¿Cuántos días a la semana comes verduras (al menos
                        100g - ejemplo: un pepino)?
                      </span>
                    </div>
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

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm font-medium  leading-relaxed">
                        1b.- Los días que sí comes verduras ¿Cuántas porciones
                        consumes (de aproximadamente 100g - ejemplo: un pepino)?
                      </span>
                    </div>
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

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm font-medium  leading-relaxed">
                        2a.- ¿Cuántos días a la semana comes frutas (al menos
                        100g - ejemplo: una manzana mediana o una rebanada de
                        sandía)?
                      </span>
                    </div>
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

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm font-medium  leading-relaxed">
                        2b.- Los días que sí comes frutas ¿Cuántas porciones
                        consumes (al menos 100g - ejemplo: una manzana mediana o
                        una rebanada de sandía)?
                      </span>
                    </div>
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

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm font-medium  leading-relaxed">
                        3.- ¿Cuántos días a la semana tomas leche sola, yogurt
                        natural (al menos un vaso mediano) o queso?
                      </span>
                    </div>
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

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm font-medium  leading-relaxed">
                        4.- ¿Cuántos vasos de agua natural tomas al día?
                      </span>
                    </div>
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

                {/* Results Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold">Resultados:</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <Button className="bg-gray-600 hover:bg-gray-700">
                      Evaluar
                    </Button>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 border rounded-md min-h-[40px]"></div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button className="bg-gray-600 hover:bg-gray-700">
                      Guardar
                    </Button>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 border rounded-md min-h-[40px]"></div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seccion2" className="space-y-6 mt-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Sección 2 - Pendiente
                  </h3>
                  <p className="text-gray-500 text-center">
                    Este cuestionario estará disponible próximamente.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="seccion3" className="space-y-6 mt-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Sección 3 - Pendiente
                  </h3>
                  <p className="text-gray-500 text-center">
                    Este cuestionario estará disponible próximamente.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="seccion4" className="space-y-6 mt-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Sección 4 - Pendiente
                  </h3>
                  <p className="text-gray-500 text-center">
                    Este cuestionario estará disponible próximamente.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700">
            <Save className="h-4 w-4" />
            Guardar Cuestionario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
