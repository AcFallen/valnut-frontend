const fs = require("fs");
const path = require("path");

// Configuración de archivos a procesar
const FILES_CONFIG = {
  "peso_talla.csv": {
    name: "WEIGHT_FOR_HEIGHT_PERCENTILES",
    description: "Peso/Longitud-Talla",
    unit: "kg",
    ageUnit: "cm",
    structure: "8col", // 8 columnas por género (incluyendo 3SD)
    boyColumns: { start: 1, end: 7 }, // columnas 1-7 para niños (7 percentiles)
    girlColumns: { ageCol: 9, start: 10, end: 16 }, // columnas 10-16 para niñas (7 percentiles)
    percentiles: 7, // número de percentiles por género
  },
  "talla_edad.csv": {
    name: "HEIGHT_FOR_AGE_PERCENTILES",
    description: "Talla/Edad",
    unit: "cm",
    ageUnit: "meses",
    structure: "7col", // 7 columnas por género, SD3neg vacío después del mes 59
    boyColumns: { start: 1, end: 7 }, // columnas 1-7 para niños
    girlColumns: { ageCol: 8, start: 9, end: 15 }, // columnas 9-15 para niñas
    percentiles: 6, // número de percentiles por género (6 percentiles OMS)
    maxAge: 228, // datos hasta el mes 228
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
    const columns = lines[i].split(",");
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

    const columns = line.split(",");

    // Columna 0 es la edad (cm para peso_talla, meses para talla_edad)
    const ageValue = parseNumber(columns[0]);

    if (ageValue !== null) {
      // Verificar límite de edad para talla_edad.csv
      if (config.maxAge && ageValue > config.maxAge) {
        return;
      }

      // Procesar datos de niños
      if (columns.length > config.boyColumns.end) {
        const boyValues = [];
        for (let i = config.boyColumns.start; i <= config.boyColumns.end; i++) {
          const value = parseNumber(columns[i]);
          if (value !== null) {
            boyValues.push(value);
          }
        }

        // Para talla_edad, aceptar datos incluso si SD3neg está vacío (después del mes 59)
        const expectedValues = config.percentiles;
        if (boyValues.length === expectedValues ||
            (fileName === "talla_edad.csv" && boyValues.length >= expectedValues - 1)) {
          // Si falta SD3neg en talla_edad, rellenar al inicio
          if (fileName === "talla_edad.csv" && boyValues.length === expectedValues - 1) {
            boyValues.unshift(null); // Agregar null al inicio para SD3neg
          }
          boys[ageValue] = boyValues;
        }
      }

      // Procesar datos de niñas
      if (columns.length > config.girlColumns.end) {
        const girlAgeValue = parseNumber(columns[config.girlColumns.ageCol]);
        if (girlAgeValue !== null) {
          const girlValues = [];
          for (let i = config.girlColumns.start; i <= config.girlColumns.end; i++) {
            const value = parseNumber(columns[i]);
            if (value !== null) {
              girlValues.push(value);
            }
          }

          // Para talla_edad, aceptar datos incluso si SD3neg está vacío
          const expectedValues = config.percentiles;
          if (girlValues.length === expectedValues ||
              (fileName === "talla_edad.csv" && girlValues.length >= expectedValues - 1)) {
            // Si falta SD3neg en talla_edad, rellenar al inicio
            if (fileName === "talla_edad.csv" && girlValues.length === expectedValues - 1) {
              girlValues.unshift(null); // Agregar null al inicio para SD3neg
            }
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
    // ${config.ageUnit}: [P0.1(-3SD), P3(-2SD), P15(-1SD), P50(Median), P85(+1SD), P97(+2SD)${config.percentiles === 7 ? ', P99.9(+3SD)' : ''}]
${Object.entries(boys)
  .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
  .map(([age, values]) => {
    const formattedValues = values.map(v => v === null ? 'null' : v).join(", ");
    return `    ${age}: [${formattedValues}],`;
  })
  .join("\n")}
  },
  girls: {
    // ${config.ageUnit}: [P0.1(-3SD), P3(-2SD), P15(-1SD), P50(Median), P85(+1SD), P97(+2SD)${config.percentiles === 7 ? ', P99.9(+3SD)' : ''}]
${Object.entries(girls)
  .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
  .map(([age, values]) => {
    const formattedValues = values.map(v => v === null ? 'null' : v).join(", ");
    return `    ${age}: [${formattedValues}],`;
  })
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
