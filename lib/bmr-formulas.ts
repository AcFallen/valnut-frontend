export interface BMRCalculationData {
  weight: number; // kg
  height: number; // cm
  age: number; // años
  gender: 'male' | 'female';
  ageInMonths: number;
}

export interface ActivityFactor {
  id: string;
  name: string;
  value: number;
  description: string;
}

export interface AgeSpecificFactors {
  ageRange: string;
  activityFactorRange: string;
  growthFactorPercentage: string;
  description: string;
}

export interface BMRFormulaOption {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  applicableGenders: ('male' | 'female')[];
}

// Factores de actividad para niños de 0-5 años
export const ACTIVITY_FACTORS: ActivityFactor[] = [
  {
    id: 'sedentario',
    name: 'Sedentario',
    value: 1.3,
    description: 'Mínima actividad física'
  },
  {
    id: 'ligero',
    name: 'Ligero',
    value: 1.4,
    description: 'Actividad física ligera'
  },
  {
    id: 'moderado',
    name: 'Moderado',
    value: 1.5,
    description: 'Actividad física moderada'
  },
  {
    id: 'intenso',
    name: 'Intenso',
    value: 1.6,
    description: 'Actividad física intensa'
  }
];

// Factores específicos por edad según guías FAO/OMS/UNU
export const AGE_SPECIFIC_FACTORS: AgeSpecificFactors[] = [
  {
    ageRange: '0-12 meses',
    activityFactorRange: '1.5 - 1.7',
    growthFactorPercentage: '+20 a 25%',
    description: 'Recién nacidos y lactantes - crecimiento rápido'
  },
  {
    ageRange: '1-3 años',
    activityFactorRange: '1.4 - 1.6',
    growthFactorPercentage: '+5 a 10%',
    description: 'Niños pequeños - crecimiento activo'
  },
  {
    ageRange: '4-5 años',
    activityFactorRange: '1.4 - 1.5',
    growthFactorPercentage: '+5%',
    description: 'Preescolares - crecimiento más lento'
  }
];

export const BMR_FORMULAS: BMRFormulaOption[] = [
  {
    id: 'caldwell-kennedy',
    name: 'Caldwell y Kennedy',
    description: 'Fórmula para lactantes menores de 2 años',
    ageRange: '< 2 años',
    applicableGenders: ['male', 'female']
  },
  {
    id: 'fleisch-boys',
    name: 'Fleisch (Niños)',
    description: 'Fórmula para niños varones',
    ageRange: '1-19 años',
    applicableGenders: ['male']
  },
  {
    id: 'fleisch-girls',
    name: 'Fleisch (Niñas)',
    description: 'Fórmula para niñas mujeres',
    ageRange: '1-19 años',
    applicableGenders: ['female']
  },
  {
    id: 'schofield-under3',
    name: 'Schofield (< 3 años)',
    description: 'Fórmula de Schofield para menores de 3 años',
    ageRange: '< 3 años',
    applicableGenders: ['male', 'female']
  },
  {
    id: 'schofield-3to10',
    name: 'Schofield (3-10 años)',
    description: 'Fórmula de Schofield para 3 a 10 años',
    ageRange: '3-10 años',
    applicableGenders: ['male', 'female']
  }
];

// Función para calcular superficie corporal usando fórmula de Haycock
export function calculateBodySurface(weight: number, height: number): number {
  // SC (m²) = 0.024265 × Peso^0.5378 (kg) × Talla^0.3964 (cm)
  return 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
}

// Caldwell y Kennedy para lactantes (< 2 años)
function calculateCaldwellKennedy(data: BMRCalculationData): number {
  const { weight, height } = data;
  // 22 + (31.05 × P) + (1.16 × A) donde A es altura y P es peso
  return 22 + (31.05 * weight) + (1.16 * height);
}

// Fleisch para niños varones
function calculateFleischBoys(data: BMRCalculationData): number {
  const { weight, height, age } = data;
  const sc = calculateBodySurface(weight, height);

  if (age >= 1 && age <= 12) {
    // 24 × SC × [54 - (0.885 × E)]
    return 24 * sc * (54 - (0.885 * age));
  } else if (age >= 13 && age <= 19) {
    // 24 × SC × (42.5 - [0.643 × (E - 13)])
    return 24 * sc * (42.5 - (0.643 * (age - 13)));
  }
  return 0;
}

// Fleisch para niñas mujeres
function calculateFleischGirls(data: BMRCalculationData): number {
  const { weight, height, age } = data;
  const sc = calculateBodySurface(weight, height);

  if (age >= 1 && age <= 12) {
    // 24 × SC × (54 - [1.045 × E])
    return 24 * sc * (54 - (1.045 * age));
  } else if (age >= 13 && age <= 19) {
    // 24 × SC × (42.5 - [0.778 × (E - 11)])
    return 24 * sc * (42.5 - (0.778 * (age - 11)));
  }
  return 0;
}

// Schofield para diferentes rangos de edad
function calculateSchofield(data: BMRCalculationData, ageRange: 'under3' | '3to10' | '11to18'): number {
  const { weight, height, gender } = data;

  if (ageRange === 'under3') {
    if (gender === 'male') {
      // (0.0007 × P) + (6.349 × A) - 2.584
      return (0.0007 * weight) + (6.349 * height) - 2.584;
    } else {
      // (0.068 × P) + (4.281 × A) - 1.730
      return (0.068 * weight) + (4.281 * height) - 1.730;
    }
  } else if (ageRange === '3to10') {
    if (gender === 'male') {
      // (0.082 × P) + (0.545 × A) × 1.736
      return ((0.082 * weight) + (0.545 * height)) * 1.736;
    } else {
      // (0.071 × P) + (0.677 × A) × 1.553
      return ((0.071 * weight) + (0.677 * height)) * 1.553;
    }
  } else if (ageRange === '11to18') {
    if (gender === 'male') {
      // (0.068 × P) + (0.574 × A) + 2.157
      return (0.068 * weight) + (0.574 * height) + 2.157;
    }
  }
  return 0;
}

export function calculateBMR(formulaId: string, data: BMRCalculationData): number {
  switch (formulaId) {
    case 'caldwell-kennedy':
      return calculateCaldwellKennedy(data);
    case 'fleisch-boys':
      return calculateFleischBoys(data);
    case 'fleisch-girls':
      return calculateFleischGirls(data);
    case 'schofield-under3':
      return calculateSchofield(data, 'under3');
    case 'schofield-3to10':
      return calculateSchofield(data, '3to10');
    default:
      return 0;
  }
}

export function getApplicableFormulas(ageInMonths: number, gender: 'male' | 'female'): BMRFormulaOption[] {
  const ageInYears = ageInMonths / 12;

  return BMR_FORMULAS.filter(formula => {
    // Verificar si el género aplica
    if (!formula.applicableGenders.includes(gender)) {
      return false;
    }

    // Verificar rangos de edad según la fórmula
    switch (formula.id) {
      case 'caldwell-kennedy':
        return ageInYears < 2;
      case 'fleisch-boys':
      case 'fleisch-girls':
        return ageInYears >= 1 && ageInYears <= 19;
      case 'schofield-under3':
        return ageInYears < 3;
      case 'schofield-3to10':
        return ageInYears >= 3 && ageInYears <= 10;
      default:
        return false;
    }
  });
}

// Función para obtener el factor de crecimiento según la edad
export function getGrowthFactor(ageInMonths: number): number {
  if (ageInMonths <= 12) {
    // 0-12 meses: +20 a 25% (usamos 22.5% como promedio)
    return 0.225;
  } else if (ageInMonths <= 36) {
    // 1-3 años: +5 a 10% (usamos 7.5% como promedio)
    return 0.075;
  } else if (ageInMonths <= 60) {
    // 4-5 años: +5%
    return 0.05;
  }
  return 0;
}

// Función para obtener los factores recomendados por edad
export function getAgeSpecificFactors(ageInMonths: number): AgeSpecificFactors | null {
  if (ageInMonths <= 12) {
    return AGE_SPECIFIC_FACTORS[0]; // 0-12 meses
  } else if (ageInMonths <= 36) {
    return AGE_SPECIFIC_FACTORS[1]; // 1-3 años
  } else if (ageInMonths <= 60) {
    return AGE_SPECIFIC_FACTORS[2]; // 4-5 años
  }
  return null;
}

// Función para calcular el Gasto Energético Total (GET)
export function calculateGET(bmr: number, activityFactor: number, ageInMonths: number): number {
  const growthFactor = getGrowthFactor(ageInMonths);

  // GET = BMR × Factor de actividad + (BMR × Factor de crecimiento)
  const activityExpenditure = bmr * activityFactor;
  const growthExpenditure = bmr * growthFactor;

  return activityExpenditure + growthExpenditure;
}