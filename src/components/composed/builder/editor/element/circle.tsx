import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"

type CircleProps = {
  x: number
  y: number
  className?: ClassValue
} & (
  | {
      mirror: false
      width: number
      height: number
    }
  | {
      mirror: true
      radiusX: number
      radiusY: number
    }
)

const circle = (params: CircleProps) => {
  if (params.mirror) {
    const { x, y, radiusX, radiusY, className } = params
    return (
      <ellipse
        cx={x}
        cy={y}
        rx={radiusX}
        ry={radiusY}
        className={cn(className)}
      ></ellipse>
    )
  } else {
    const { x, y, width, height, className } = params

    return (
      <ellipse
        cx={x + width / 2}
        cy={y + height / 2}
        rx={width / 2}
        ry={height / 2}
        className={cn(className)}
      ></ellipse>
    )
  }
}

export default circle
