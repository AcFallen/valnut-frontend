import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Weight,
  TrendingUp,
  Calculator,
  Utensils,
  Activity,
  Heart,
  TestTube,
  FileText,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TwentyToFiftyFormProps {
  patientId: string;
  dateOfBirth: string | null;
}

export function TwentyToFiftyForm({
  patientId,
  dateOfBirth,
}: TwentyToFiftyFormProps) {
  return (
    <div className="space-y-6 pr-2">
      {/* Grid principal - 3 columnas en md */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* COLUMNA 1: Datos Antropométricos, Diagnóstico y Macronutrientes */}
        <div className="space-y-6 col-span-1 ">
          {/* Cálculo Antropométrico */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Weight className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Cálculo Antropométrico
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="peso" className="w-20 text-left font-medium">
                  Peso:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="peso"
                    placeholder="70"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kg</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="pesoHabitual"
                  className="w-20 text-left font-medium"
                >
                  Peso Habitual:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="pesoHabitual"
                    placeholder="75"
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
                    placeholder="175"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>cm</span>
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
                  htmlFor="estadoNutricional"
                  className="w-32 text-left font-medium text-sm"
                >
                  Estado Nutricional:
                </Label>
                <Input
                  id="estadoNutricional"
                  placeholder="NORMAL"
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="imc"
                  className="w-32 text-left font-medium text-sm"
                >
                  IMC:
                </Label>
                <Input id="imc" placeholder="22.9" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="relPHPA"
                  className="w-32 text-left font-medium text-sm"
                >
                  Rel PH/PA:
                </Label>
                <Input id="relPHPA" placeholder="93.3%" className="flex-1" />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="pMinA"
                  className="w-16 text-left font-medium text-sm"
                >
                  pMinA:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="pMinA"
                    placeholder="67"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kg</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="pMaxA"
                  className="w-16 text-left font-medium text-sm"
                >
                  pMaxA:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="pMaxA"
                    placeholder="83"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: Requerimientos */}
        <div className="space-y-6 col-span-1 md:col-span-2">
          {/* Macronutrientes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="h-5 w-5 text-violet-600" />
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                Macronutrientes
              </h3>
            </div>
            <Separator className="mb-2" />

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead className="text-center">Prescripción</TableHead>
                    <TableHead className="text-center">Req Diario</TableHead>
                    <TableHead className="text-center">DMC</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Proteínas</TableCell>
                    <TableCell className="">
                      <Input placeholder="15%" className="text-center" />
                    </TableCell>
                    <TableCell className="">
                      <Input placeholder="84g" className="text-center" />
                    </TableCell>
                    <TableCell className="">
                      <Input placeholder="336" className="text-center" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lípidos</TableCell>
                    <TableCell className="">
                      <Input placeholder="30%" className="text-center" />
                    </TableCell>
                    <TableCell className="">
                      <Input placeholder="75g" className="text-center" />
                    </TableCell>
                    <TableCell className="">
                      <Input placeholder="672" className="text-center" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">H. Carbono</TableCell>
                    <TableCell className="">
                      <Input placeholder="55%" className="text-center" />
                    </TableCell>
                    <TableCell className="">
                      <Input placeholder="308g" className="text-center" />
                    </TableCell>
                    <TableCell className="">
                      <Input placeholder="1232" className="text-center" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
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
                    <SelectValue placeholder="Seleccione fórmula" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harris-benedict">
                      Harris-Benedict
                    </SelectItem>
                    <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                    <SelectItem value="katch-mcardle">Katch-McArdle</SelectItem>
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

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="tasaMetabolica"
                  className="w-32 text-left font-medium text-sm"
                >
                  Tasa Metabólica Basal:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="tasaMetabolica"
                    placeholder="1650"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kcal/día</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="gastoEnergetico"
                  className="w-32 text-left font-medium text-sm"
                >
                  Gasto Energético Total:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="gastoEnergetico"
                    placeholder="2240"
                    className="rounded-r-none font-semibold"
                  />
                  <div className="px-3 py-1 bg-violet-100 dark:bg-violet-800 border border-l-0 rounded-r-md text-sm font-semibold flex items-center">
                    <span>kcal/día</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="reduccion"
                  className="w-32 text-left font-medium text-sm"
                >
                  Reducción:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="reduccion"
                    placeholder="500"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kcal</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor="perdidaPeso"
                  className="w-32 text-left font-medium text-sm"
                >
                  Pérdida de Peso:
                </Label>
                <div className="flex flex-1">
                  <Input
                    id="perdidaPeso"
                    placeholder="0.5"
                    className="rounded-r-none"
                  />
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm flex items-center">
                    <span>kg/semana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 3: Tabs con Antropometría, Patología y Biometría */}
        <div className="space-y-6 col-span-1 md:col-span-3">
          <Tabs defaultValue="antropometria" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="antropometria" className="text-xs">
                <Activity className="h-4 w-4 mr-1" />
                Antropometría
              </TabsTrigger>
              <TabsTrigger value="patologia" className="text-xs">
                <Heart className="h-4 w-4 mr-1" />
                Patología
              </TabsTrigger>
              <TabsTrigger value="biometria" className="text-xs">
                <TestTube className="h-4 w-4 mr-1" />
                Biometría
              </TabsTrigger>
            </TabsList>

            <TabsContent value="antropometria" className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Pliegues cutáneos */}
                  <div>
                    <h4 className="font-medium text-xs text-violet-700 dark:text-violet-300 mb-2">
                      Pliegues cutáneos(cm)
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Bicipital",
                        "Tricipital",
                        "Subescapular",
                        "Suprailíaco",
                        "Abdominal",
                        "Pantorrilla",
                        "Femoral",
                        "Pectoral",
                      ].map((field) => (
                        <div key={field} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field}
                          </Label>
                          <Input className="h-7 text-xs" placeholder="0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Circunferencias */}
                  <div>
                    <h4 className="font-medium text-xs text-violet-700 dark:text-violet-300 mb-2">
                      Circunferencias (cm)
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Braquial",
                        "Pantorrilla",
                        "Cintura",
                        "Cadera",
                        "Muñeca",
                      ].map((field) => (
                        <div key={field} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field}
                          </Label>
                          <Input
                            className={`h-7 text-xs ${
                              field === "Cadera" || field === "Muñeca"
                                ? "bg-yellow-50 dark:bg-yellow-900/20"
                                : ""
                            }`}
                            placeholder="0"
                          />
                        </div>
                      ))}
                    </div>

                    <h5 className="font-medium text-xs text-violet-700 dark:text-violet-300 mt-4 mb-2">
                      Diámetros (cm)
                    </h5>
                    <div className="space-y-2">
                      {["Muñeca", "Fémur"].map((field) => (
                        <div key={field} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field}
                          </Label>
                          <Input className="h-7 text-xs" placeholder="0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resultados */}
                  <div>
                    <h4 className="font-medium text-xs text-violet-700 dark:text-violet-300 mb-2">
                      Resultados
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          label: "Contextura",
                          color: "bg-purple-100 dark:bg-purple-900/20",
                        },
                        {
                          label: "Riesgo CV",
                          color: "bg-purple-100 dark:bg-purple-900/20",
                        },
                        {
                          label: "Reserva Proteica",
                          color: "bg-purple-100 dark:bg-purple-900/20",
                        },
                        {
                          label: "Reserva Calórica",
                          color: "bg-purple-100 dark:bg-purple-900/20",
                        },
                        { label: "Porcentaje de Grasa", color: "" },
                        { label: "Porcentaje Masa", color: "" },
                        { label: "Peso Óseo", color: "" },
                        {
                          label: "Peso Residual",
                          color: "bg-purple-100 dark:bg-purple-900/20",
                          value: "18,08",
                        },
                        { label: "Masa Muscular", color: "" },
                        {
                          label: "Agua Corporal",
                          color: "bg-purple-100 dark:bg-purple-900/20",
                          value: "42,84",
                        },
                      ].map((field) => (
                        <div
                          key={field.label}
                          className="flex items-center gap-2"
                        >
                          <Label className="w-24 text-xs font-medium">
                            {field.label}
                          </Label>
                          <Input
                            className={`h-7 text-xs ${field.color}`}
                            placeholder={field.value || "0"}
                            defaultValue={field.value || ""}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patologia" className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm text-violet-700 dark:text-violet-300 mb-3">
                  Antecedentes
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Antecedentes Familiares */}
                  <div>
                    <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-3">
                      Familiares
                    </h5>
                    <div className="space-y-2">
                      {[
                        "Diabetes Mellitus",
                        "Obesidad",
                        "Cardiopatías",
                        "Hipertensión",
                        "Arteroesclerosis",
                        "Nefropatías",
                        "Cáncer",
                        "Osteoporosis",
                        "Gota",
                        "Hepatitis",
                        "Hipertiroidismo",
                        "Hipotiroidismo",
                      ].map((condition) => (
                        <div
                          key={`fam-${condition}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`fam-${condition}`}
                            className="w-3 h-3 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                          />
                          <Label
                            htmlFor={`fam-${condition}`}
                            className="text-xs"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Antecedentes Personales */}
                  <div>
                    <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-3">
                      Personales
                    </h5>
                    <div className="space-y-2">
                      {[
                        "Diabetes Mellitus",
                        "Obesidad",
                        "Cardiopatías",
                        "Hipertensión",
                        "Arteroesclerosis",
                        "Nefropatías",
                        "Cáncer",
                        "Osteoporosis",
                        "Gota",
                        "Hepatitis",
                        "Hipertiroidismo",
                        "Hipotiroidismo",
                      ].map((condition) => (
                        <div
                          key={`per-${condition}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`per-${condition}`}
                            className="w-3 h-3 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                          />
                          <Label
                            htmlFor={`per-${condition}`}
                            className="text-xs"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actuales */}
                  <div>
                    <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-3">
                      Actuales
                    </h5>
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
                        "Toma:",
                        "Laxantes",
                        "Diuréticos",
                        "Antiácidos",
                        "Analgésicos",
                      ].map((condition) => (
                        <div
                          key={`act-${condition}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`act-${condition}`}
                            className="w-3 h-3 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                          />
                          <Label
                            htmlFor={`act-${condition}`}
                            className="text-xs"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="biometria" className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm text-violet-700 dark:text-violet-300 mb-3">
                  Datos bioquímicos
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {[
                      { label: "Hemoglobina", unit: "g/dL" },
                      { label: "Glucosa", unit: "mg/dL" },
                      { label: "HbA1c", unit: "%" },
                      { label: "Hematocrito", unit: "%" },
                      { label: "Ferritina", unit: "" },
                      { label: "Triglicéridos", unit: "mg/dL" },
                      { label: "Colesterol", unit: "mg/dL" },
                      { label: "Colesterol HDL", unit: "mg/dL" },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="flex items-center gap-3"
                      >
                        <Label className="w-24 text-xs font-medium">
                          {field.label}
                        </Label>
                        <div className="flex flex-1">
                          <Input
                            className="h-7 text-xs rounded-r-none"
                            placeholder=""
                          />
                          {field.unit && (
                            <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-xs flex items-center min-w-[60px] justify-center">
                              <span>{field.unit}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Colesterol LDL", unit: "mg/dL" },
                      { label: "Leucocitos", unit: "cel/mm3" },
                      { label: "Ácido úrico", unit: "mg/dL" },
                      { label: "Creatina", unit: "mg/dL" },
                      { label: "Urea", unit: "mg/dL" },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="flex items-center gap-3"
                      >
                        <Label className="w-24 text-xs font-medium">
                          {field.label}
                        </Label>
                        <div className="flex flex-1">
                          <Input
                            className="h-7 text-xs rounded-r-none"
                            placeholder=""
                          />
                          {field.unit && (
                            <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-xs flex items-center min-w-[60px] justify-center">
                              <span>{field.unit}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
              placeholder="brindarlafatitvitasedfasdy"
              rows={4}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">Cancelar</Button>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Guardar Consulta
        </Button>
      </div>
    </div>
  );
}
