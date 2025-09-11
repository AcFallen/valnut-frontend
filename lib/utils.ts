import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInYears, differenceInMonths } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AvatarInfo {
  imagePath: string;
  ageText: string;
  ageInYears: number;
  ageInMonths: number;
  description: string;
}

export function getPatientAvatarAndAge(
  dateOfBirth: string | null,
  gender: string | null
): AvatarInfo {
  const today = new Date();

  if (!dateOfBirth) {
    // Sin fecha de nacimiento, usar avatar por defecto basado en género
    const defaultImagePath =
      gender === "female"
        ? "/assets/images/avatar/mujer.png"
        : "/assets/images/avatar/hombre.png";
    return {
      imagePath: defaultImagePath,
      ageText: "Edad no especificada",
      ageInYears: 0,
      ageInMonths: 0,
      description: "Sin categoría",
    };
  }

  const birthDate = new Date(dateOfBirth);
  const ageInYears = differenceInYears(today, birthDate);
  const ageInMonths = differenceInMonths(today, birthDate);
  const ageInDays = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Formatear texto de edad
  let ageText = "";
  if (ageInYears === 0) {
    if (ageInDays <= 28) {
      ageText = `${ageInDays} ${ageInDays === 1 ? "día" : "días"}`;
    } else {
      ageText = `${ageInMonths} ${ageInMonths === 1 ? "mes" : "meses"}`;
    }
  } else if (ageInYears === 1) {
    const remainingMonths = ageInMonths - 12;
    if (remainingMonths === 0) {
      ageText = "1 año";
    } else {
      ageText = `1 año y ${remainingMonths} ${
        remainingMonths === 1 ? "mes" : "meses"
      }`;
    }
  } else {
    const remainingMonths = ageInMonths - ageInYears * 12;
    if (remainingMonths === 0) {
      ageText = `${ageInYears} años`;
    } else {
      ageText = `${ageInYears} años y ${remainingMonths} ${
        remainingMonths === 1 ? "mes" : "meses"
      }`;
    }
  }

  // Determinar categoría, descripción y avatar basado en edad y género
  let imagePath = "/assets/images/avatar/";
  let description = "";

  // Categorías por edad
  if (ageInDays <= 28) {
    // Recién nacido: 0 – 28 días
    description = "Recién nacido";
    imagePath += gender === "female" ? "bebe_f.png" : "bebe_m.png";
  } else if (ageInDays <= 180) {
    // Lactante menor: 29 días – 5 meses 29 días (aproximadamente 180 días)
    description = "Lactante menor";
    imagePath += gender === "female" ? "bebe_f.png" : "bebe_m.png";
  } else if (ageInMonths <= 11) {
    // Lactante mayor: 6 – 11 meses 29 días
    description = "Lactante mayor";
    imagePath += gender === "female" ? "bebe_f.png" : "bebe_m.png";
  } else if (ageInMonths <= 23) {
    // Niño 1 – 2 años: 12 – 23 meses
    description = "Niño 1 - 2 años";
    imagePath += gender === "female" ? "nina.png" : "nino.png";
  } else if (ageInYears < 5) {
    // Preescolar: 2 – 4 años 11 meses 29 días
    description = "Preescolar";
    imagePath += gender === "female" ? "nina.png" : "nino.png";
  } else if (ageInYears < 10) {
    // Escolar: 5 – 9 años 11 meses 29 días
    description = "Escolar";
    imagePath += gender === "female" ? "nina.png" : "nino.png";
  } else if (ageInYears < 14) {
    // Adolescente temprano: 10 – 13 años 11 meses 29 días
    description = "Adolescente temprano";
    imagePath += gender === "female" ? "nina.png" : "nino.png";
  } else if (ageInYears < 17) {
    // Adolescente intermedio: 14 – 16 años 11 meses 29 días
    description = "Adolescente intermedio";
    imagePath += gender === "female" ? "mujer.png" : "hombre.png";
  } else if (ageInYears < 20) {
    // Adolescente tardío: 17 – 19 años 11 meses 29 días
    description = "Adolescente tardío";
    imagePath += gender === "female" ? "mujer.png" : "hombre.png";
  } else if (ageInYears < 30) {
    // Joven: 20 – 29 años 11 meses 29 días
    description = "Joven";
    imagePath += gender === "female" ? "mujer.png" : "hombre.png";
  } else if (ageInYears < 60) {
    // Adulto: 30 – 59 años 11 meses 29 días
    description = "Adulto";
    imagePath += gender === "female" ? "mujer.png" : "hombre.png";
  } else {
    // Anciano: >= 60
    description = "Anciano";
    imagePath += gender === "female" ? "abuela.png" : "abuelo.png";
  }

  return {
    imagePath,
    ageText,
    ageInYears,
    ageInMonths,
    description,
  };
}

/**
 * Parse a date string (YYYY-MM-DD) to a Date object in local timezone
 * This prevents the common issue where dates are offset by one day due to UTC interpretation
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
}
