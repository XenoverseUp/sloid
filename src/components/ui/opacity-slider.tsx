"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { Color } from "@/types/Canvas"

const OpacitySlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    color?: Color
  }
>(({ className, color = "#000000", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backgroundImage: `linear-gradient(to right, transparent, ${color})`,
      }}
      className="relative h-3 w-full grow overflow-hidden rounded-full "
    ></SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      style={{
        // @ts-ignore
        "--current-color": "black",
      }}
      className="block h-4 w-4 rounded-full border-2 shadow border-white bg-[--current-color]  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
))
OpacitySlider.displayName = "OpacitySlider"

export { OpacitySlider }
