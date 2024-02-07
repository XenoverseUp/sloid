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

export const rgb2hsl = (r: number, g: number, b: number) => {
  ;(r = r / 255), (g = g / 255), (b = b / 255)
  var max = Math.max(r, g, b)
  var min = Math.min(r, g, b)
  var lum = (max + min) / 2
  var hue
  var sat
  if (max == min) {
    hue = 0
    sat = 0
  } else {
    var c = max - min
    sat = c / (1 - Math.abs(2 * lum - 1))
    switch (max) {
      case r:
        // hue = (g - b) / c;
        hue = ((g - b) / c) % 6
        // hue = (g - b) / c + (g < b ? 6 : 0);
        break
      case g:
        hue = (b - r) / c + 2
        break
      case b:
        hue = (r - g) / c + 4
        break
    }
  }
  hue = Math.round(hue! * 60) // °
  sat = Math.round(sat * 100) // %
  lum = Math.round(lum * 100) // %
  return [hue, sat, lum]
}
