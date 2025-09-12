import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
  ClipboardList,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface SixtyPlusFormProps {
  patientId: string;
  dateOfBirth: string | null;
}

export function SixtyPlusForm({
  patientId,
  dateOfBirth,
}: SixtyPlusFormProps) {
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

        {/* COLUMNA 3: Tabs con 4 secciones */}
        <div className="space-y-6 col-span-1 md:col-span-3">
          <Tabs defaultValue="minivaloracion" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="minivaloracion" className="text-xs">
                <ClipboardList className="h-4 w-4 mr-1" />
                Minivaloración
              </TabsTrigger>
              <TabsTrigger value="antropometria" className="text-xs">
                <Activity className="h-4 w-4 mr-1" />
                Antropometría
              </TabsTrigger>
              <TabsTrigger value="patologia" className="text-xs">
                <Heart className="h-4 w-4 mr-1" />
                Patología
              </TabsTrigger>
              <TabsTrigger value="bioquimica" className="text-xs">
                <TestTube className="h-4 w-4 mr-1" />
                Bioquímica
              </TabsTrigger>
            </TabsList>

            <TabsContent value="minivaloracion" className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm text-violet-700 dark:text-violet-300 mb-3">
                  Índice Antropométrico
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Primera columna */}
                  <div className="space-y-3">
                    {[
                      "Índice de masa corporal",
                      "Perímetro de antebrazo",
                      "Perímetro de pantorrilla",
                      "Pérdida reciente de peso"
                    ].map((field, index) => (
                      <div key={field} className="flex items-center justify-between gap-3">
                        <Label className="text-xs font-medium flex-1">{index + 1}. {field}</Label>
                        <Select>
                          <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                        Evaluación global
                      </h5>
                      {[
                        "paciente vive independientemente en su domicilio",
                        "Toma más de tres medicamentos por día",
                        "Presenta alguna enfermedad aguda o situación de estrés psicológico en los últimos 3 meses",
                        "Movilidad",
                        "Problemas neurológicos",
                        "Úlceras o lesiones cutáneas"
                      ].map((field, index) => (
                        <div key={field} className="flex items-center justify-between gap-3">
                          <Label className="text-xs font-medium flex-1">{index + 5}. {field}</Label>
                          <Switch />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Segunda columna */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                        Parámetros Dietéticos
                      </h5>
                      {[
                        "Número de comidas completas que consume al día",
                        "Consume lácteos, carnes, huevos o legumbres",
                        "Productos lácteos al menos una vez/día",
                        "Huevos / legumbres dos o más v/semana",
                        "Carne, pescado o aves diariamente",
                        "Consume frutas y verduras al menos dos veces por día",
                        "¿Ha comido menos por pérdida de apetito, problemas digestivos, dificultad de masticar o tragar en los últimos 3 meses?",
                        "Consumo de agua u otros líquidos al día",
                        "Forma de alimentarse"
                      ].map((field, index) => (
                        <div key={field} className="flex items-center justify-between gap-3">
                          <Label className="text-xs font-medium flex-1">{index + 11}. {field}</Label>
                          {index < 3 ? (
                            <Switch />
                          ) : (
                            <Switch />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                        Valoración subjetiva
                      </h5>
                      {[
                        "El paciente considera que tiene problemas nutricionales",
                        "En comparación con personas de su edad, ¿Cómo se encuentra su estado de salud?"
                      ].map((field, index) => (
                        <div key={field} className="flex items-center justify-between gap-3">
                          <Label className="text-xs font-medium flex-1">{index + 17}. {field}</Label>
                          <Switch />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evaluación */}
                <div className="mt-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm text-blue-700 dark:text-blue-300">
                      TOTAL 30 PUNTOS (MÁXIMO)
                    </h5>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="outline">Evaluar</Button>
                    <Input className="w-20 text-center font-semibold" placeholder="19.5" />
                    <div className="flex-1 bg-blue-100 dark:bg-blue-900 rounded px-3 py-2 text-center">
                      <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                        ADULTO MAYOR EN RIESGO DE DESNUTRICIÓN
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      Interpretación
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="antropometria" className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Pliegues cutáneos */}
                  <div>
                    <h4 className="font-medium text-xs text-violet-700 dark:text-violet-300 mb-2">
                      Pliegues cutáneos (cm)
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Bicipital",
                        "Tricipital",
                        "Subescap",
                        "Suprailíac",
                        "Abdomina",
                        "Pantorrilla",
                        "Femoral",
                        "Pectoral",
                      ].map((field) => (
                        <div key={field} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field}
                          </Label>
                          <Input 
                            className="h-7 text-xs" 
                            placeholder="0"
                            defaultValue={field === "Tricipital" ? "6" : field === "Subescap" ? "7" : field === "Suprailíac" ? "6" : field === "Abdomina" ? "13" : field === "Pantorrilla" ? "5" : field === "Femoral" ? "6" : field === "Bicipital" ? "8" : "0"} 
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2">
                      <h5 className="font-medium text-xs text-violet-700 dark:text-violet-300">
                        Otros
                      </h5>
                      {[
                        { label: "Altura de rodilla", color: "bg-blue-100 dark:bg-blue-900/20" },
                        { label: "Extensión de brazos", color: "" }
                      ].map((field) => (
                        <div key={field.label} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field.label}
                          </Label>
                          <Input className={`h-7 text-xs ${field.color}`} placeholder="0" />
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
                        { label: "Braquial", value: "35" },
                        { label: "Pantorrilla", value: "25" },
                        { label: "Cintura", value: "68", highlighted: true },
                        { label: "Cadera", value: "69", highlighted: true },
                        { label: "Muñeca", value: "17", highlighted: true },
                      ].map((field) => (
                        <div key={field.label} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field.label}
                          </Label>
                          <Input
                            className={`h-7 text-xs ${
                              field.highlighted 
                                ? "bg-gray-200 dark:bg-gray-700" 
                                : ""
                            }`}
                            placeholder="0"
                            defaultValue={field.value}
                          />
                        </div>
                      ))}
                    </div>

                    <h5 className="font-medium text-xs text-violet-700 dark:text-violet-300 mt-4 mb-2">
                      Diámetros (cm)
                    </h5>
                    <div className="space-y-2">
                      {[
                        { label: "Muñeca", value: "12" },
                        { label: "Fémur", value: "15" }
                      ].map((field) => (
                        <div key={field.label} className="flex items-center gap-2">
                          <Label className="w-20 text-xs font-medium">
                            {field.label}
                          </Label>
                          <Input className="h-7 text-xs" placeholder="0" defaultValue={field.value} />
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
                        { label: "Contextura", value: "MEDIANA" },
                        { label: "Riesgo CV", value: "NORMAL" },
                        { label: "Reserva Proteica", value: "MUY ALTA" },
                        { label: "Reserva Calórica", value: "MUY BAJA" },
                        { label: "Porcentaje de Grasa", value: "13.74" },
                        { label: "Porcentaje Masa", value: "84.43 58.26" },
                        { label: "Peso Óseo", value: "0.97" },
                        { label: "Peso Residual", value: "15.63" },
                        { label: "Masa Muscular", value: "40.66" },
                        { label: "Agua Corporal", value: "36.84" },
                      ].map((field) => (
                        <div key={field.label} className="flex items-center gap-2">
                          <Label className="w-24 text-xs font-medium">
                            {field.label}
                          </Label>
                          <Input
                            className="h-7 text-xs"
                            placeholder="0"
                            defaultValue={field.value}
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

            <TabsContent value="bioquimica" className="space-y-3">
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
              placeholder="Ingrese las indicaciones para el paciente..."
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