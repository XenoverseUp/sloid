"use client"

import { HueSlider } from "@/components/ui/hue-slider"
import { OpacitySlider } from "@/components/ui/opacity-slider"
import { cn, rgb2hsl } from "@/lib/utils"
import { Color, Point } from "@/types/Canvas"
import { AngleIcon, ShadowInnerIcon } from "@radix-ui/react-icons"
import { ClassValue } from "clsx"
import { useEffect, useMemo, useRef, useState } from "react"

type ColorPaletteProps = {
  className?: ClassValue
  width?: number
  height?: number
  value?: Color
  onValueChange?: (newValue: Color) => void
}

const ColorPalette = ({
  className,
  width = 230,
  height = 230,
  value,
  onValueChange = () => {},
}: ColorPaletteProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [hue, setHue] = useState<number>(180)
  const [saturation, setSaturation] = useState<number>(0)
  const [lightness, setLightness] = useState<number>(100)
  const [opacity, setOpacity] = useState<number>(100)
  const [canvasPointer, setCanvasPointer] = useState<Point>({
    x: 0,
    y: 0,
  } as Point)

  const color = useMemo<Color>(
    () => `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    [hue, saturation, lightness]
  )

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const context = canvas.getContext("2d") as CanvasRenderingContext2D
    canvas.width = width
    canvas.height = height

    context.fillStyle = `hsl(${hue}, 100%, 50%)`
    context.fillRect(0, 0, width, height)

    let lightGradient = context.createLinearGradient(0, 0, width, 0)
    lightGradient.addColorStop(0, "rgb(255, 255, 255)")
    lightGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    context.fillStyle = lightGradient
    context.fillRect(0, 0, width, height)

    let darkGradient = context.createLinearGradient(0, 0, 0, height)
    darkGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
    darkGradient.addColorStop(1, "rgb(0, 0, 0)")
    context.fillStyle = darkGradient
    context.fillRect(0, 0, width, height)

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()

      const xPercentage = (e.clientX - rect.left) / canvas.width
      const yPercentage = (e.clientY - rect.top) / canvas.height

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixelX = Math.floor(xPercentage * canvas.width)
      const pixelY = Math.floor(yPercentage * canvas.height)
      const pixelIndex = (pixelY * canvas.width + pixelX) * 4

      const [h, s, l] = rgb2hsl(
        imageData.data[pixelIndex],
        imageData.data[pixelIndex + 1],
        imageData.data[pixelIndex + 2]
      )

      setHue(h)
      setSaturation(s)
      setLightness(l)

      setCanvasPointer({ x: xPercentage * 100, y: yPercentage * 100 } as Point)
    }

    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [hue])

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative">
        <span
          style={{
            left: `calc(${canvasPointer.x}% - 8px)`,
            top: `calc(${canvasPointer.y}% - 8px)`,
            background: color,
          }}
          className="w-4 h-4 bg-transparent border-2 rounded-full border-white ring-1 ring-border absolute"
        ></span>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
      <div className="px-3 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-primary-foreground flex items-center flex-col text-xs">
            <AngleIcon />
          </div>
          <HueSlider
            name="hue-slider"
            min={0}
            max={360}
            step={0.5}
            value={[hue]}
            onValueChange={(v) => setHue(v[0])}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-primary-foreground flex items-center flex-col text-xs">
            <ShadowInnerIcon />
          </div>
          <OpacitySlider
            name="hue-slider"
            min={0}
            max={100}
            step={1}
            value={[opacity]}
            onValueChange={(v) => setOpacity(v[0])}
            color={color}
          />
        </div>
      </div>
    </div>
  )
}

export { ColorPalette }
