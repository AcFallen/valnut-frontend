import { useState, useEffect } from "react";
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
  calculateHeightForAge,
  type HeightForAgeResult
} from "@/constants/talla_edad";
import {
  calculateWeightForAge,
  type WeightForAgeResult
} from "@/constants/peso_edad";
import {
  calculateWeightForHeight,
  type WeightForHeightResult
} from "@/constants/peso_talla";
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
import {
  getApplicableFormulas,
  calculateBMR,
  calculateGET,
  getAgeSpecificFactors,
  BMRFormulaOption,
  ACTIVITY_FACTORS,
  ActivityFactor,
  AgeSpecificFactors,
} from "@/lib/bmr-formulas";
interface UnderFiveFormProps {
  patientId: string;
  dateOfBirth: string | null;
  gender?: "male" | "female"; // Añadir género como prop
}

export function UnderFiveForm({
  patientId,
  dateOfBirth,
  gender = "male",
}: UnderFiveFormProps) {
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);

  // Estados para datos antropométricos
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [clothingWeight, setClothingWeight] = useState<string>("");

  // Estados para fórmula BMR
  const [selectedFormula, setSelectedFormula] = useState<string>("");
  const [applicableFormulas, setApplicableFormulas] = useState<
    BMRFormulaOption[]
  >([]);
  const [calculatedBMR, setCalculatedBMR] = useState<number>(0);

  // Estados para GET (Gasto Energético Total)
  const [selectedActivityFactor, setSelectedActivityFactor] =
    useState<string>("");
  const [useGETCalculation, setUseGETCalculation] = useState<boolean>(false);
  const [calculatedGET, setCalculatedGET] = useState<number>(0);
  const [ageSpecificFactors, setAgeSpecificFactors] =
    useState<AgeSpecificFactors | null>(null);

  // Estado para el diagnóstico de Talla/Edad
  const [heightForAgeResult, setHeightForAgeResult] =
    useState<HeightForAgeResult | null>(null);

  // Estado para el diagnóstico de Peso/Edad
  const [weightForAgeResult, setWeightForAgeResult] =
    useState<WeightForAgeResult | null>(null);

  // Estado para el diagnóstico de Peso/Talla
  const [weightForHeightResult, setWeightForHeightResult] =
    useState<WeightForHeightResult | null>(null);

  // Función para calcular la edad en meses
  const calculateAgeInMonths = () => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    return differenceInMonths(today, birthDate);
  };

  const ageInMonths = calculateAgeInMonths();
  const shouldShowBMIField = ageInMonths > 24; // Mayor de 24 meses (2 años)

  // Función para calcular el peso neto (peso total - peso de la ropa)
  const calculateNetWeight = (): number => {
    const totalWeight = parseFloat(weight);
    const clothingWt = parseFloat(clothingWeight);

    if (isNaN(totalWeight)) return 0;
    if (isNaN(clothingWt)) return totalWeight; // Si no hay peso de ropa, usar peso total

    return Math.max(0, totalWeight - clothingWt); // Evitar pesos negativos
  };

  const netWeight = calculateNetWeight();

  // Efecto para calcular las fórmulas aplicables según edad y género
  useEffect(() => {
    if (ageInMonths > 0) {
      const formulas = getApplicableFormulas(ageInMonths, gender);
      setApplicableFormulas(formulas);

      // Si hay fórmulas aplicables y no hay una seleccionada, seleccionar la primera
      if (formulas.length > 0 && !selectedFormula) {
        setSelectedFormula(formulas[0].id);
      }

      // Obtener factores específicos por edad
      const factors = getAgeSpecificFactors(ageInMonths);
      setAgeSpecificFactors(factors);
    }
  }, [ageInMonths, gender, selectedFormula]);

  // Efecto para calcular BMR cuando cambian los datos
  useEffect(() => {
    if (selectedFormula && weight && height && ageInMonths > 0) {
      const heightNum = parseFloat(height);
      const ageInYears = ageInMonths / 12;

      if (netWeight > 0 && !isNaN(heightNum)) {
        const bmr = calculateBMR(selectedFormula, {
          weight: netWeight, // Usar peso neto en lugar del peso total
          height: heightNum,
          age: ageInYears,
          gender,
          ageInMonths,
        });
        setCalculatedBMR(bmr);
      } else {
        setCalculatedBMR(0);
      }
    }
  }, [
    selectedFormula,
    weight,
    clothingWeight,
    height,
    ageInMonths,
    gender,
    netWeight,
  ]);

  // Efecto para calcular GET cuando cambian los datos
  useEffect(() => {
    if (
      useGETCalculation &&
      calculatedBMR > 0 &&
      selectedActivityFactor &&
      ageInMonths > 0
    ) {
      const activityFactor = ACTIVITY_FACTORS.find(
        (factor) => factor.id === selectedActivityFactor
      );
      if (activityFactor) {
        const get = calculateGET(
          calculatedBMR,
          activityFactor.value,
          ageInMonths
        );
        setCalculatedGET(get);
      }
    } else {
      setCalculatedGET(0);
    }
  }, [useGETCalculation, calculatedBMR, selectedActivityFactor, ageInMonths]);

  // Efecto para calcular el diagnóstico de Talla/Edad
  useEffect(() => {
    if (height && ageInMonths > 0) {
      const heightNum = parseFloat(height);
      if (!isNaN(heightNum) && heightNum > 0) {
        const result = calculateHeightForAge(heightNum, ageInMonths, gender);
        setHeightForAgeResult(result);
      } else {
        setHeightForAgeResult(null);
      }
    } else {
      setHeightForAgeResult(null);
    }
  }, [height, ageInMonths, gender]);

  // Efecto para calcular el diagnóstico de Peso/Edad
  useEffect(() => {
    if (ageInMonths > 0 && netWeight > 0) {
      const result = calculateWeightForAge(netWeight, ageInMonths, gender);
      setWeightForAgeResult(result);
    } else {
      setWeightForAgeResult(null);
    }
  }, [netWeight, ageInMonths, gender]);

  // Efecto para calcular el diagnóstico de Peso/Talla
  useEffect(() => {
    if (height && netWeight > 0) {
      const heightNum = parseFloat(height);
      if (!isNaN(heightNum) && heightNum > 0) {
        const result = calculateWeightForHeight(netWeight, heightNum, gender);
        setWeightForHeightResult(result);
      } else {
        setWeightForHeightResult(null);
      }
    } else {
      setWeightForHeightResult(null);
    }
  }, [height, netWeight, gender]);

  // Función para obtener la descripción de la fórmula seleccionada
  const getSelectedFormulaDescription = () => {
    const formula = applicableFormulas.find((f) => f.id === selectedFormula);
    return formula ? `${formula.description} (${formula.ageRange})` : "";
  };

  // Función para obtener la descripción del factor de actividad seleccionado
  const getSelectedActivityDescription = () => {
    const factor = ACTIVITY_FACTORS.find(
      (f) => f.id === selectedActivityFactor
    );
    return factor ? factor.description : "";
  };

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
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
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
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
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
                      value={clothingWeight}
                      onChange={(e) => setClothingWeight(e.target.value)}
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

              {/* Indicador de peso neto */}
              {weight && (
                <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-md border border-teal-200 dark:border-teal-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                        Peso Neto para Cálculos:
                      </p>
                      <p className="text-xs text-teal-600 dark:text-teal-300">
                        {clothingWeight
                          ? `${weight} kg - ${clothingWeight} kg (ropa) = ${netWeight.toFixed(
                              2
                            )} kg`
                          : `${netWeight.toFixed(
                              2
                            )} kg (sin descuento de ropa)`}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-teal-800 dark:text-teal-200">
                      {netWeight.toFixed(2)} kg
                    </div>
                  </div>
                </div>
              )}
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
                <div className="flex flex-1 gap-2">
                  <Input
                    id="longitudTallaEdad"
                    value={heightForAgeResult?.diagnosis || ""}
                    placeholder="TALLA BAJA SEVERA"
                    readOnly
                    className={`flex-1 font-medium ${
                      heightForAgeResult?.diagnosis === "TALLA BAJA SEVERA"
                        ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300"
                        : heightForAgeResult?.diagnosis === "TALLA BAJA"
                        ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-300"
                        : heightForAgeResult?.diagnosis === "NORMAL"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300"
                        : heightForAgeResult?.diagnosis === "ALTA"
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  />
                  {heightForAgeResult && (
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 rounded border">
                      <span title={`Percentil: ${heightForAgeResult.percentile}, Z-Score: ${heightForAgeResult.zScore}`}>
                        {heightForAgeResult.percentile}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="pesoEdad"
                  className="w-32 text-left font-medium text-sm"
                >
                  Peso/Edad:
                </Label>
                <div className="flex flex-1 gap-2">
                  <Input
                    id="pesoEdad"
                    value={weightForAgeResult?.diagnosis || ""}
                    placeholder="NORMAL"
                    readOnly
                    className={`flex-1 font-medium ${
                      weightForAgeResult?.diagnosis === "DESNUTRIDO"
                        ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300"
                        : weightForAgeResult?.diagnosis === "NORMAL"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300"
                        : weightForAgeResult?.diagnosis === "SOBREPESO"
                        ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-300"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  />
                  {weightForAgeResult && (
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 rounded border">
                      <span title={`Percentil: ${weightForAgeResult.percentile}, Z-Score: ${weightForAgeResult.zScore}`}>
                        {weightForAgeResult.percentile}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="pesoLongitudTalla"
                  className="w-32 text-left font-medium text-sm"
                >
                  Peso/Longitud-talla:
                </Label>
                <div className="flex flex-1 gap-2">
                  <Input
                    id="pesoLongitudTalla"
                    value={weightForHeightResult?.diagnosis || ""}
                    placeholder="NORMAL"
                    readOnly
                    className={`flex-1 font-medium ${
                      weightForHeightResult?.diagnosis === "DESNUTRIDO SEVERO"
                        ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300"
                        : weightForHeightResult?.diagnosis === "DESNUTRIDO"
                        ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-300"
                        : weightForHeightResult?.diagnosis === "NORMAL"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300"
                        : weightForHeightResult?.diagnosis === "SOBREPESO"
                        ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300"
                        : weightForHeightResult?.diagnosis === "OBESIDAD"
                        ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  />
                  {weightForHeightResult && (
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 rounded border">
                      <span title={`Percentil: ${weightForHeightResult.percentile}, Z-Score: ${weightForHeightResult.zScore}`}>
                        {weightForHeightResult.percentile}
                      </span>
                    </div>
                  )}
                </div>
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
              <div className="space-y-3">
                <p className="text-sm text-violet-600 font-semibold">
                  Tasa Metabolica Basal según Formula
                </p>

                {/* Selector de fórmula */}
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="formulaSelector"
                    className="w-32 text-left font-medium text-sm"
                  >
                    Fórmula:
                  </Label>
                  <Select
                    value={selectedFormula}
                    onValueChange={setSelectedFormula}
                  >
                    <SelectTrigger className="flex-1" id="formulaSelector">
                      <SelectValue placeholder="Seleccione fórmula" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicableFormulas.map((formula) => (
                        <SelectItem key={formula.id} value={formula.id}>
                          {formula.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Descripción de la fórmula */}
                {selectedFormula && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      {getSelectedFormulaDescription()}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="tmbCalculated"
                    className="w-32 text-left font-medium text-sm"
                  >
                    TMB Calculada:
                  </Label>
                  <div className="flex flex-1">
                    <Input
                      id="tmbCalculated"
                      value={calculatedBMR ? calculatedBMR.toFixed(2) : ""}
                      placeholder="0.00"
                      readOnly
                      className="rounded-r-none bg-gray-100 dark:bg-gray-800"
                    />
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                      <span>kcal/día</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle para usar cálculo de GET */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="useGET" className="text-sm font-medium">
                    Calcular Gasto Energético Total (GET)
                  </Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Incluye factor de actividad y crecimiento
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useGET"
                    checked={useGETCalculation}
                    onChange={(e) => setUseGETCalculation(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              {useGETCalculation && (
                <>
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="tipoActividad"
                      className="w-32 text-left font-medium text-sm"
                    >
                      Factor de Actividad:
                    </Label>
                    <Select
                      value={selectedActivityFactor}
                      onValueChange={setSelectedActivityFactor}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccione factor" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACTIVITY_FACTORS.map((factor) => (
                          <SelectItem key={factor.id} value={factor.id}>
                            {factor.name} ({factor.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descripción del factor seleccionado */}
                  {selectedActivityFactor && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {getSelectedActivityDescription()}
                      </p>
                    </div>
                  )}

                  {/* Recomendaciones específicas por edad */}
                  {ageSpecificFactors && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-800">
                      <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Recomendaciones para {ageSpecificFactors.ageRange}:
                      </h4>
                      <div className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
                        <p>
                          <strong>Factor de actividad:</strong>{" "}
                          {ageSpecificFactors.activityFactorRange}
                        </p>
                        <p>
                          <strong>Factor de crecimiento:</strong>{" "}
                          {ageSpecificFactors.growthFactorPercentage}
                        </p>
                        <p>
                          <strong>Descripción:</strong>{" "}
                          {ageSpecificFactors.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Campo para mostrar GET calculado */}
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="getCalculated"
                      className="w-32 text-left font-medium text-sm"
                    >
                      GET Calculado:
                    </Label>
                    <div className="flex flex-1">
                      <Input
                        id="getCalculated"
                        value={calculatedGET ? calculatedGET.toFixed(2) : ""}
                        placeholder="0.00"
                        readOnly
                        className="rounded-r-none bg-violet-100 dark:bg-violet-800 font-semibold"
                      />
                      <div className="px-3 py-1 bg-violet-100 dark:bg-violet-800 border border-l-0 rounded-r-md text-sm font-semibold flex items-center">
                        <span>kcal/día</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
                  placeholder="De 46,6 a 52,2 cm"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

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
