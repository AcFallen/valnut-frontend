import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { differenceInMonths } from "date-fns";
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
interface UnderFiveFormProps {
  patientId: string;
  dateOfBirth: string | null;
}

export function UnderFiveForm({ patientId, dateOfBirth }: UnderFiveFormProps) {
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);

  // Función para calcular la edad en meses
  const calculateAgeInMonths = () => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    return differenceInMonths(today, birthDate);
  };

  const ageInMonths = calculateAgeInMonths();
  const shouldShowBMIField = ageInMonths > 24; // Mayor de 24 meses (2 años)

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
                      placeholder="14"
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
                      placeholder="80"
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
                      placeholder="0.5"
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
                      placeholder="52"
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
                  htmlFor="longitudTallaEdad"
                  className="w-32 text-left font-medium text-sm"
                >
                  Longitud-talla/Edad:
                </Label>
                <Input
                  id="longitudTallaEdad"
                  placeholder="TALLA BAJA SEVERA"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="pesoEdad"
                  className="w-32 text-left font-medium text-sm"
                >
                  Peso/Edad:
                </Label>
                <Input id="pesoEdad" placeholder="NORMAL" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="pesoLongitudTalla"
                  className="w-32 text-left font-medium text-sm"
                >
                  Peso/Longitud-talla:
                </Label>
                <Input
                  id="pesoLongitudTalla"
                  placeholder="SOBREPESO"
                  className="flex-1"
                />
              </div>

              {shouldShowBMIField && (
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="imcEdad"
                    className="w-32 text-left font-medium text-sm"
                  >
                    IMC/Edad:
                  </Label>
                  <Input id="imcEdad" placeholder="NORMAL" className="flex-1" />
                </div>
              )}

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
                Cálculo del Gasto Energético
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
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
                  Tasa Metabolica Basal según Formula
                </p>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="tmbSchofield"
                    className="w-32 text-left font-medium text-sm"
                  >
                    TMB Según (Schofield):
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="tmbSchofield"
                      placeholder="802.6"
                      className="rounded-r-none"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span>kcal/día</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="gastoEnergeticoTotalSchofield"
                    className="w-32 text-left font-medium text-sm"
                  >
                    Gasto Energético Total:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="gastoEnergeticoTotalSchofield"
                      placeholder="1343.197875"
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
              placeholder="brindarlafatitvitasedfasdy"
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
