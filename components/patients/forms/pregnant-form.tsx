"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Save,
  Weight,
  TrendingUp,
  Calculator,
  Baby,
  Activity,
  TestTube,
  ClipboardList,
} from "lucide-react";
import { FoodHabitsQuestionnaire } from "./food-habits-questionnaire";

interface PregnantFormProps {
  patientId: string;
  dateOfBirth: string | null;
}

export function PregnantForm({ patientId, dateOfBirth }: PregnantFormProps) {
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);

  return (
    <div className="space-y-6 pr-2">
      {/* Grid principal - 6 columnas como sixty-plus form */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* COLUMNA 1: Datos Antropométricos y Tipo de Embarazo */}
        <div className="space-y-6 col-span-1">
          {/* Datos Antropométricos */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Weight className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Datos Antropométricos
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="peso" className="w-20 text-left font-medium">
                  Peso PG:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="peso"
                    placeholder="56"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kg</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="pesoActual"
                  className="w-20 text-left font-medium"
                >
                  Peso Actual:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="pesoActual"
                    placeholder="56"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kg</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="talla" className="w-20 text-left font-medium">
                  Talla:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="talla"
                    placeholder="160"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>cm</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="alturaUterina"
                  className="w-20 text-left font-medium"
                >
                  Altura Uterina:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="alturaUterina"
                    placeholder="50"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>cm</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="edad" className="w-20 text-left font-medium">
                  Edad:
                </Label>
                <Input id="edad" placeholder="22" className="flex-1" />
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="edadGestacional"
                  className="w-20 text-left font-medium"
                >
                  Edad Gestacional:
                </Label>
                <Input
                  id="edadGestacional"
                  placeholder="20"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Tipo de Embarazo */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Baby className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Tipo de Embarazo
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="tipoEmbarazo"
                  className="w-32 text-left font-medium text-sm"
                >
                  Tipo de Embarazo:
                </Label>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="ÚNICO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unico">ÚNICO</SelectItem>
                    <SelectItem value="gemelar">GEMELAR</SelectItem>
                    <SelectItem value="multiple">MÚLTIPLE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: Diagnóstico Nutricional y Requerimientos */}
        <div className="space-y-6 col-span-1 md:col-span-2">
          {/* Diagnóstico Nutricional según Indicadores */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Diagnóstico Nutricional según Indicadores
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="imcPg"
                  className="w-32 text-left font-medium text-sm"
                >
                  IMC PG:
                </Label>
                <Input id="imcPg" placeholder="21.88" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="estadoNutricional"
                  className="w-32 text-left font-medium text-sm"
                >
                  Estado Nutricional PG:
                </Label>
                <Input
                  id="estadoNutricional"
                  placeholder="NORMAL"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="gananciaRecomendada"
                  className="w-32 text-left font-medium text-sm"
                >
                  Ganancia de peso Recomendada:
                </Label>
                <Input
                  id="gananciaRecomendada"
                  placeholder="0"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="interpretacion"
                  className="w-32 text-left font-medium text-sm"
                >
                  Interpretación:
                </Label>
                <Input
                  id="interpretacion"
                  placeholder="BAJA GANANCIA DE PESO"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="interpretacionAlturaUterina"
                  className="w-32 text-left font-medium text-sm"
                >
                  Interpretación de Altura Uterina:
                </Label>
                <Input
                  id="interpretacionAlturaUterina"
                  placeholder="ALTURA UTERINA INADECUADA"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Requerimientos */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Requerimientos
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="formula"
                  className="w-32 text-left font-medium text-sm"
                >
                  Fórmula:
                </Label>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="FAO/OMS/UNU" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fao">FAO/OMS/UNU</SelectItem>
                    <SelectItem value="harris">Harris-Benedict</SelectItem>
                    <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="tipoActividad"
                  className="w-32 text-left font-medium text-sm"
                >
                  Tipo de Actividad:
                </Label>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="MODERADA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ligera">LIGERA</SelectItem>
                    <SelectItem value="moderada">MODERADA</SelectItem>
                    <SelectItem value="intensa">INTENSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="tasaMetabolica"
                  className="w-32 text-left font-medium text-sm"
                >
                  Tasa Metabólica Basal:
                </Label>
                <Input
                  id="tasaMetabolica"
                  placeholder="1243"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="adicional"
                  className="w-32 text-left font-medium text-sm"
                >
                  Adicional:
                </Label>
                <Input id="adicional" placeholder="" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="gastoTotal"
                  className="w-32 text-left font-medium text-sm"
                >
                  Gasto Energético Total:
                </Label>
                <Input
                  id="gastoTotal"
                  placeholder="2522.4"
                  className="flex-1 font-semibold"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-3">
                <p className="text-sm text-violet-600 font-semibold">
                  Macronutrientes
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <Label className="text-xs font-medium">Prescripción</Label>
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Req. Diario</Label>
                  </div>
                  <div>
                    <Label className="text-xs font-medium">DMC</Label>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <Label className="text-sm font-medium">Proteínas:</Label>
                  <Input placeholder="0.8" className="text-center" />
                  <Input placeholder="" className="text-center" />
                  <Input placeholder="" className="text-center" />
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <Label className="text-sm font-medium">Lípidos:</Label>
                  <Input placeholder="" className="text-center" />
                  <Input placeholder="" className="text-center" />
                  <Input placeholder="" className="text-center" />
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <Label className="text-sm font-medium">H. Carbono:</Label>
                  <Input placeholder="" className="text-center" />
                  <Input placeholder="" className="text-center" />
                  <Input placeholder="55" className="text-center" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
                  <div>g/kg</div>
                  <div>g/día</div>
                  <div>%</div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-600">
                    PROTEÍNAS: 0.86/KG, 44.30G/DÍA, 8.01% - CARBOHIDRATOS: 55%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 3: Tabs con Patologías y Bioquímica */}
        <div className="space-y-6 col-span-1 md:col-span-3">
          <Tabs defaultValue="patologias" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patologias" className="text-xs">
                <Activity className="h-4 w-4 mr-1" />
                Patologías
              </TabsTrigger>
              <TabsTrigger value="bioquimica" className="text-xs">
                <TestTube className="h-4 w-4 mr-1" />
                Bioquímica
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patologias" className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-violet-700 dark:text-violet-300">
                    Antecedentes
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Familiares */}
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-600 mb-3">
                      Familiares
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Diabetes Mellitus",
                        "Obesidad",
                        "Cardiopatías",
                        "Hipertensión",
                        "Arteriosclerosis",
                        "Nefropatías",
                        "Cáncer",
                        "Osteoporosis",
                        "Gota",
                        "Hepatitis",
                        "Hipertiroidismo",
                        "Hipotiroidismo",
                      ].map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`familiar-${condition}`} />
                          <Label
                            htmlFor={`familiar-${condition}`}
                            className="text-sm"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personales */}
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-600 mb-3">
                      Personales
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Diabetes Mellitus",
                        "Obesidad",
                        "Cardiopatías",
                        "Hipertensión",
                        "Arteriosclerosis",
                        "Nefropatías",
                        "Cáncer",
                        "Osteoporosis",
                        "Gota",
                        "Hepatitis",
                        "Hipertiroidismo",
                        "Hipotiroidismo",
                      ].map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`personal-${condition}`} />
                          <Label
                            htmlFor={`personal-${condition}`}
                            className="text-sm"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actuales */}
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-600 mb-3">
                      Actuales
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Diarrea",
                        "Estreñimiento",
                        "Gastritis",
                        "Úlcera",
                        "Náuseas",
                        "Pirosis",
                        "Vómito",
                        "Colitis",
                        "Dentadura Parcial",
                      ].map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`actual-${condition}`} />
                          <Label
                            htmlFor={`actual-${condition}`}
                            className="text-sm"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}

                      <div className="mt-4">
                        <Label className="text-sm font-medium">Toma:</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Checkbox id="laxantes" />
                          <Label htmlFor="laxantes" className="text-sm">
                            Laxantes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Checkbox id="diureticos" />
                          <Label htmlFor="diureticos" className="text-sm">
                            Diuréticos
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Checkbox id="antiacidos" />
                          <Label htmlFor="antiacidos" className="text-sm">
                            Antiácidos
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Checkbox id="analgesicos" />
                          <Label htmlFor="analgesicos" className="text-sm">
                            Analgésicos
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bioquimica" className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-4">
                  <TestTube className="h-5 w-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-violet-700 dark:text-violet-300">
                    Datos Bioquímicos
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Hemoglobina", unit: "g/dL" },
                    { label: "Glucosa", unit: "mg/dL" },
                    { label: "HbA1c", unit: "%" },
                    { label: "Hematocrito", unit: "%" },
                    { label: "Ferritina", unit: "" },
                    { label: "Triglicéridos", unit: "mg/dL" },
                    { label: "Colesterol", unit: "mg/dL" },
                    { label: "Colesterol HDL", unit: "mg/dL" },
                    { label: "Colesterol LDL", unit: "mg/dL" },
                    { label: "Leucocitos", unit: "cel/mm3" },
                    { label: "Ácido úrico", unit: "mg/dL" },
                    { label: "Creatina", unit: "mg/dL" },
                    { label: "Urea", unit: "mg/dL" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <Label className="w-24 text-sm font-medium">
                        {item.label}:
                      </Label>
                      <div className="flex flex-1">
                        <Input
                          placeholder=""
                          className={item.unit ? "rounded-r-none" : ""}
                        />
                        {item.unit && (
                          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                            <span>{item.unit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Indicaciones */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Indicaciones
              </h3>
            </div>
            <Separator className="mb-2" />

            <Textarea
              placeholder="Ingrese las indicaciones para el paciente..."
              rows={4}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between gap-3 pt-6 border-t">
        <Button 
          variant="secondary" 
          className="gap-2 bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={() => setQuestionnaireOpen(true)}
        >
          <ClipboardList className="h-4 w-4" />
          Cuestionario de Hábitos Alimentarios
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Guardar Consulta
          </Button>
        </div>
      </div>

      {/* Food Habits Questionnaire Dialog */}
      <FoodHabitsQuestionnaire
        open={questionnaireOpen}
        onOpenChange={setQuestionnaireOpen}
      />
    </div>
  );
}
