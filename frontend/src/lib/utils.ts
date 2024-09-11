import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCPF = (cpf: string | undefined) => {
  if (!cpf) {
    return '';
  }
  return cpf.replace(/\D/g, '') // Remove non-numeric characters
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};


export const validateCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  const cleanedCPF = cpf.replace(/\D/g, '');

  // Check if CPF has 11 digits
  if (cleanedCPF.length !== 11) return false;

  // Check for invalid CPFs with all digits the same (e.g., 111.111.111-11)
  if (/^(\d)\1+$/.test(cleanedCPF)) return false;

  // Validate CPF digits
  const calculateDigit = (cpf: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calculateDigit(cleanedCPF, 10);
  const digit2 = calculateDigit(cleanedCPF, 11);

  return digit1 === parseInt(cleanedCPF[9]) && digit2 === parseInt(cleanedCPF[10]);
};

export const removeCPFFormatting = (cpf: string) => {
  return cpf.replace(/\D/g, ''); // Remove all non-numeric characters
}