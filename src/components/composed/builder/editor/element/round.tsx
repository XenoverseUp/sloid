import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import { UUID } from "crypto"

type RoundProps = {
  x: number
  y: number
  className?: ClassValue
  id: UUID
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

const Round = (params: RoundProps) => {
  if (params.mirror) {
    const { x, y, radiusX, radiusY, className, id } = params
    return (
      <ellipse
        cx={x}
        cy={y}
        rx={radiusX}
        ry={radiusY}
        className={cn(className)}
        id={id}
      ></ellipse>
    )
  } else {
    const { x, y, width, height, className, id } = params

    return (
      <ellipse
        cx={x + width / 2}
        cy={y + height / 2}
        rx={width / 2}
        ry={height / 2}
        className={cn(className)}
        id={id}
      ></ellipse>
    )
  }
}

export default Round
