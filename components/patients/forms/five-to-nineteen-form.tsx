import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
  Stethoscope,
  Calculator,
  ClipboardList,
} from "lucide-react";
import { FoodHabitsQuestionnaire } from "./food-habits-questionnaire";

interface FiveToNineteenFormProps {
  patientId: string;
  dateOfBirth: string | null;
}

export function FiveToNineteenForm({
  patientId,
  dateOfBirth,
}: FiveToNineteenFormProps) {
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);

  return (
    <div className="space-y-6 pr-2">
      {/* Grid principal - 3 columnas en md */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUMNA 1: Datos Antropométricos y Diagnóstico */}
        <div className="space-y-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="peso" className="w-20 text-left font-medium">
                    Peso:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="peso"
                      placeholder="45"
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
                      placeholder="150"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span>cm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="pesoRopa"
                    className="w-20 text-left font-medium"
                  >
                    Peso Ropa:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="pesoRopa"
                      placeholder="1.0"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span>kg</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="perimetroCraneal"
                    className="w-20 text-left font-medium text-xs"
                  >
                    P. Craneal:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="perimetroCraneal"
                      placeholder="55"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span>cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  htmlFor="imc"
                  className="w-32 text-left font-medium text-sm"
                >
                  IMC:
                </Label>
                <Input id="imc" placeholder="NORMAL" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="tallaEdad"
                  className="w-32 text-left font-medium text-sm"
                >
                  Talla/Edad:
                </Label>
                <Input id="tallaEdad" placeholder="NORMAL" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="imcEdad"
                  className="w-32 text-left font-medium text-sm"
                >
                  IMC/Edad:
                </Label>
                <Input id="imcEdad" placeholder="NORMAL" className="flex-1" />
              </div>

              <div className="space-y-2 pt-4">
                <Label
                  htmlFor="conclusionDiagnostico"
                  className="text-base font-semibold"
                >
                  CONCLUSIÓN DE DIAGNÓSTICO
                </Label>
                <Textarea
                  id="conclusionDiagnostico"
                  placeholder="Ingrese la conclusión del diagnóstico..."
                  rows={3}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: Cálculo del Gasto Energético Total */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Cálculo del Gasto Energético Total
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="objetivoNutricional"
                  className="w-32 text-left font-medium text-sm"
                >
                  Objetivo Nutricional:
                </Label>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Seleccione objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="ganancia">Ganancia de peso</SelectItem>
                    <SelectItem value="perdida">Pérdida de peso</SelectItem>
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
                    <SelectValue placeholder="Seleccione actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentario</SelectItem>
                    <SelectItem value="ligero">Ligero</SelectItem>
                    <SelectItem value="moderado">Moderado</SelectItem>
                    <SelectItem value="intenso">Intenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-3">
                <p className="text-sm text-violet-600 font-semibold">
                  TMB Según Harris y Benedict
                </p>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="tasaMetabolicaBasal"
                    className="w-32 text-left font-medium text-sm"
                  >
                    Tasa Metabólica Basal:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="tasaMetabolicaBasal"
                      placeholder="1200.00"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span>kcal/día</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="gastoActividadFisica"
                    className="w-32 text-left font-medium text-sm"
                  >
                    Gasto por Actividad Física:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="gastoActividadFisica"
                      placeholder="900.00"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span> kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="accionTermogenica"
                    className="w-32 text-left font-medium text-sm"
                  >
                    Acción Termogénica:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="accionTermogenica"
                      placeholder="120.00"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span> kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="gastoEnergeticoTotal"
                    className="w-32 text-left font-medium text-sm"
                  >
                    Gasto Energético Total:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="gastoEnergeticoTotal"
                      placeholder="2220.00"
                      className="rounded-r-none font-semibold"
                    />
                    <div className="px-3 py-1 bg-violet-100 dark:bg-violet-800 border border-l-0 rounded-r-md text-sm font-semibold flex items-center">
                      <span>kcal/día</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 3: Exámenes Auxiliares e Indicaciones */}
        <div className="space-y-6">
          {/* Exámenes Auxiliares */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Exámenes Auxiliares
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="parasitologico"
                  className="w-28 text-left font-medium text-sm"
                >
                  Parasitológico:
                </Label>
                <Select>
                  <SelectTrigger className="flex-1" id="parasitologico">
                    <SelectValue placeholder="Seleccione resultado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="negativo">Negativo</SelectItem>
                    <SelectItem value="positivo">Positivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="hemoglobina"
                  className="w-28 text-left font-medium text-sm"
                >
                  Hemoglobina:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="hemoglobina"
                    placeholder="13.5"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>mg/dl</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="altura"
                  className="w-28 text-left font-medium text-sm"
                >
                  Altura:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="altura"
                    placeholder="4000"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>m.s.n.m</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="ajustePorAltura"
                  className="w-28 text-left font-medium text-sm"
                >
                  Ajuste por Altura:
                </Label>
                <Input
                  id="ajustePorAltura"
                  placeholder="3.00"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="hemoglobinaCorregida"
                  className="w-28 text-left font-medium text-sm"
                >
                  Hb Corregida:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="hemoglobinaCorregida"
                    placeholder="10.00"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>mg/dl</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="conclusion"
                  className="w-28 text-left font-medium text-sm"
                >
                  Conclusión:
                </Label>
                <Input
                  id="conclusion"
                  placeholder="ANEMIA LEVE"
                  className="flex-1"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sugerenciaTratamiento"
                  className="text-sm font-medium"
                >
                  Sugerencia de Tratamiento
                </Label>
                <Textarea
                  id="sugerenciaTratamiento"
                  placeholder="3 mg/Kg/día, Máxima dosis 70mg/día de Sulfato Ferroso o Gotas de Complejo Polimaltosado Férrico Durante 6 meses Al mes, a los 3 meses y 6 meses de iniciado el tratamiento Interpretación del perímetro craneal"
                  rows={3}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="rangoNormalidad"
                  className="w-28 text-left font-medium text-sm"
                >
                  Rango de normalidad:
                </Label>
                <Input
                  id="rangoNormalidad"
                  placeholder="De 52 a 58 cm"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

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
