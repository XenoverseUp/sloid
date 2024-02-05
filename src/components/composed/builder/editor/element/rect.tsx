import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import { UUID } from "crypto"

type RectProps = {
  x: number
  y: number
  className?: ClassValue
  width: number
  height: number
  id: UUID
}

const Rect = (params: RectProps) => (
  <rect
    x={params.x}
    y={params.y}
    width={params.width}
    height={params.height}
    className={cn(params.className)}
    id={params.id}
    key={params.id}
  ></rect>
)

export default Rect
