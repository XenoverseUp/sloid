import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPixelRatio = (context: any) => {
  let backingStore =
    context?.backingStorePixelRatio ||
    context?.webkitBackingStorePixelRatio ||
    context?.mozBackingStorePixelRatio ||
    context?.msBackingStorePixelRatio ||
    context?.oBackingStorePixelRatio ||
    context?.backingStorePixelRatio ||
    1

  return (window.devicePixelRatio || 1) / backingStore
}
