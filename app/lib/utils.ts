import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS_LONG  = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
