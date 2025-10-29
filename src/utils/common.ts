import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const isDevelopmentMode = (): boolean => process.env.NODE_ENV === "development";

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
