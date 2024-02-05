import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"

type RectProps = {
  x: number
  y: number
  className?: ClassValue
} & (
  | {
      square: false
      mirror: false
      width: number
      height: number
    }
  | {
      square: true
      mirror: false
      width: number
    }
  | {
      square: false
      mirror: true
      radiusX: number
      radiusY: number
    }
  | {
      square: true
      mirror: true
      width: number
    }
)

const rect = (params: RectProps) => {
  if (params.square) {
    if (params.mirror)
      return (
        <rect
          x={params.x - params.width}
          y={params.y - params.width}
          width={2 * params.width}
          height={2 * params.width}
          className={cn(params.className)}
        ></rect>
      )
    else
      return (
        <rect
          x={params.x}
          y={params.y}
          width={params.width}
          height={params.width}
          className={cn(params.className)}
        ></rect>
      )
  } else {
    if (params.mirror)
      return (
        <rect
          x={params.x - params.radiusX}
          y={params.y - params.radiusY}
          width={2 * params.radiusX}
          height={2 * params.radiusY}
          className={cn(params.className)}
        ></rect>
      )
    else
      return (
        <rect
          x={params.x}
          y={params.y}
          width={params.width}
          height={params.height}
          className={cn(params.className)}
        ></rect>
      )
  }
}

export default rect
