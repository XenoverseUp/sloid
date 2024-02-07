"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const HueSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-color-wheel">
      <SliderPrimitive.Range className="absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      style={{
        // @ts-ignore
        "--current-color": `hsl(${props.value ?? 0}, 100%, 50%)`,
      }}
      className="block h-4 w-4 rounded-full border-2 shadow border-white bg-[--current-color]  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
))
HueSlider.displayName = "HueSlider"

export { HueSlider }
