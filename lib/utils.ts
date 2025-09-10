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
    };
  }

  const birthDate = new Date(dateOfBirth);
  const ageInYears = differenceInYears(today, birthDate);
  const ageInMonths = differenceInMonths(today, birthDate);

  // Formatear texto de edad
  let ageText = "";
  if (ageInYears === 0) {
    ageText = `${ageInMonths} ${ageInMonths === 1 ? "mes" : "meses"}`;
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

  // Determinar avatar basado en edad y género
  let imagePath = "/assets/images/avatar/";

  if (ageInYears < 2) {
    // Bebé (0-1 años)
    imagePath += gender === "female" ? "bebe_f.png" : "bebe_m.png";
  } else if (ageInYears < 12) {
    // Niño/a (2-11 años)
    imagePath += gender === "female" ? "nina.png" : "nino.png";
  } else if (ageInYears < 60) {
    // Adulto (12-59 años)
    imagePath += gender === "female" ? "mujer.png" : "hombre.png";
  } else {
    // Adulto mayor (60+ años)
    imagePath += gender === "female" ? "abuela.png" : "abuelo.png";
  }

  return {
    imagePath,
    ageText,
    ageInYears,
    ageInMonths,
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
