const fs = require("fs");
const path = require("path");

// Configuración de archivos a procesar
const FILES_CONFIG = {
  "peso_talla.csv": {
    name: "WEIGHT_FOR_HEIGHT_PERCENTILES",
    description: "Peso/Longitud-Talla",
    unit: "kg",
    ageUnit: "cm",
    structure: "7col", // 7 columnas por género
  },
  "talla_edad.csv": {
    name: "HEIGHT_FOR_AGE_PERCENTILES",
    description: "Talla/Edad",
    unit: "cm",
    ageUnit: "meses",
    structure: "7col", // 7 columnas por género, datos vacíos después del mes 59
  },
};

function parseNumber(str) {
  if (!str || str.trim() === "") return null;
  const num = parseFloat(str.replace(",", "."));
  return isNaN(num) ? null : Math.round(num * 1000) / 1000; // Limitar a 3 decimales
}

function processCSV(fileName, config) {
  console.log(`\n🔍 Procesando ${fileName}...`);

  const filePath = path.join(__dirname, "..", "constants", fileName);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n").filter((line) => line.trim());

  console.log(`📄 Total de líneas: ${lines.length}`);

  // Examinar las primeras líneas para entender la estructura
  console.log("\n📋 Estructura del archivo:");
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const columns = lines[i].split(";");
    console.log(`Línea ${i + 1}: ${columns.length} columnas`);
    if (i < 3) {
      console.log(
        `  Contenido: [${columns.map((col) => `"${col}"`).join("], [")}]`
      );
    }
  }

  const boys = {};
  const girls = {};

  // Estructura para peso_talla.csv y talla_edad.csv
  // Saltar las primeras 2 líneas (títulos)
  const dataLines = lines.slice(2);
  console.log(`\n📊 Líneas de datos: ${dataLines.length}`);

  dataLines.forEach((line) => {
    if (!line.trim()) return;

    const columns = line.split(";");

    // Para peso_talla.csv: columna 0 es cm, para talla_edad.csv: columna 0 es meses
    const ageValue = parseNumber(columns[0]);

    if (ageValue !== null) {
      // Datos de niños: columnas 1-6 (6 percentiles: -3SD, -2SD, -1SD, Median, +1SD, +2SD)
      if (columns.length > 6) {
        const boyValues = [];
        for (let i = 1; i <= 6; i++) {
          const value = parseNumber(columns[i]);
          if (value !== null) boyValues.push(value);
        }
        if (boyValues.length === 6) {
          boys[ageValue] = boyValues;
        }
      }

      // Datos de niñas: verificar si hay datos en las columnas de niñas
      if (columns.length > 14) {
        const girlAgeValue = parseNumber(columns[8]); // Columna 8 para edad de niñas
        if (girlAgeValue !== null) {
          const girlValues = [];
          for (let i = 9; i <= 14; i++) {
            const value = parseNumber(columns[i]);
            if (value !== null) girlValues.push(value);
          }
          if (girlValues.length === 6) {
            girls[girlAgeValue] = girlValues;
          }
        }
      }
    }
  });

  console.log(`✅ Datos de niños: ${Object.keys(boys).length} edades`);
  console.log(`✅ Datos de niñas: ${Object.keys(girls).length} edades`);

  if (Object.keys(boys).length > 0) {
    const boyAges = Object.keys(boys)
      .map(Number)
      .sort((a, b) => a - b);
    console.log(
      `   Rango niños: ${boyAges[0]} - ${boyAges[boyAges.length - 1]}`
    );
    console.log(
      `   Muestra: ${boyAges[0]} => [${boys[boyAges[0]].join(", ")}]`
    );
  }

  if (Object.keys(girls).length > 0) {
    const girlAges = Object.keys(girls)
      .map(Number)
      .sort((a, b) => a - b);
    console.log(
      `   Rango niñas: ${girlAges[0]} - ${girlAges[girlAges.length - 1]}`
    );
    console.log(
      `   Muestra: ${girlAges[0]} => [${girls[girlAges[0]].join(", ")}]`
    );
  }

  return { boys, girls, config };
}

function generateTypeScriptFile(data, fileName) {
  const { boys, girls, config } = data;

  const content = `// ${config.description} - Percentiles OMS
// Unidad: ${config.unit}
// Edad en: ${config.ageUnit}
// Fuente: Organización Mundial de la Salud

export const ${config.name} = {
  boys: {
    // ${config.ageUnit}: [P0.1(-3SD), P3(-2SD), P15(-1SD), P50(Median), P85(+1SD), P97(+2SD)]
${Object.entries(boys)
  .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
  .map(([age, values]) => `    ${age}: [${values.join(", ")}],`)
  .join("\n")}
  },
  girls: {
    // ${config.ageUnit}: [P0.1(-3SD), P3(-2SD), P15(-1SD), P50(Median), P85(+1SD), P97(+2SD)]
${Object.entries(girls)
  .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
  .map(([age, values]) => `    ${age}: [${values.join(", ")}],`)
  .join("\n")}
  }
};
`;

  const outputFileName = fileName.replace(".csv", ".ts");
  const outputPath = path.join(__dirname, "..", "constants", outputFileName);

  fs.writeFileSync(outputPath, content, "utf8");
  console.log(`💾 Generado: ${outputFileName}`);
}

function main() {
  console.log("🚀 Generando archivos TypeScript desde CSV...\n");

  Object.entries(FILES_CONFIG).forEach(([fileName, config]) => {
    try {
      const data = processCSV(fileName, config);
      generateTypeScriptFile(data, fileName);
    } catch (error) {
      console.error(`❌ Error procesando ${fileName}:`, error.message);
    }
  });

  console.log("\n✅ ¡Proceso completado!");
}

main();
