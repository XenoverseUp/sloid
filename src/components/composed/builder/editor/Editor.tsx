import { cn, getPixelRatio } from "@/lib/utils"
import {
  CanvasMode,
  CanvasState,
  CanvasTool,
  Point,
  Rectangle,
} from "@/types/Canvas"
import { useList, useMouse } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"

const resolution = 1024
const WIDTH = resolution
const HEIGHT = (resolution * 9) / 16

type EditorProps = {
  canvasState: CanvasState
  setCanvasMode: (mode: CanvasMode) => void
  setCurrentPosition: (point: Point) => void
  setDragEnd: (point: Point) => void
  setDragStart: (point: Point) => void
  setPressed: () => void
  setReleased: () => void
  clearCanvasMode: () => void
}

const Editor = ({
  canvasState,
  clearCanvasMode,
  setCanvasMode,
  setCurrentPosition,
  setDragEnd,
  setDragStart,
  setPressed,
  setReleased,
}: EditorProps) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const parent = useRef<HTMLDivElement>(null)
  const [mouse] = useMouse()
  const [x, setX] = useState<number>(-999)
  const [y, setY] = useState<number>(-999)

  useEffect(() => {
    let requestId: number | null = null
    const render = () => {
      let canvas = ref.current as HTMLCanvasElement
      let context = canvas.getContext("2d") as CanvasRenderingContext2D
      let ratio = getPixelRatio(context)

      ;(() => {
        let physicalWidth = parseFloat(
          getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
        )
        let physicalHeight = parseFloat(
          getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
        )

        canvas.width = physicalWidth * ratio
        canvas.height = physicalHeight * ratio
        canvas.style.width = `${physicalWidth}px`
        canvas.style.height = `${physicalHeight}px`

        setX(
          ((mouse.x - canvas.getBoundingClientRect().x) / physicalWidth) * WIDTH
        )
        setY(
          ((mouse.y - canvas.getBoundingClientRect().y) / physicalHeight) *
            HEIGHT
        )
      })()

      const CONVERSION_RATIO = canvas.width / resolution

      const rect = (rect: Rectangle, mode: "fill" | "stroke" = "fill") => {
        if (mode == "fill")
          context.fillRect(
            rect.x * CONVERSION_RATIO,
            rect.y * CONVERSION_RATIO,
            rect.width * CONVERSION_RATIO,
            rect.height * CONVERSION_RATIO
          )
        else if (mode == "stroke")
          context.strokeRect(
            rect.x * CONVERSION_RATIO,
            rect.y * CONVERSION_RATIO,
            rect.width * CONVERSION_RATIO,
            rect.height * CONVERSION_RATIO
          )
      }

      rect({ x: x as number, y: y as number, width: 10, height: 10 }, "stroke")

      if (canvasState.pressed) {
        if (
          Math.abs(canvasState.dragStart.x - x) < 5 &&
          Math.abs(canvasState.dragStart.y - y) < 5
        ) {
          context.fillStyle = "#000000"
        } else {
          context.fillStyle = "#ff0000"
        }

        context.beginPath()
        context.arc(
          canvas.width / 2,
          canvas.height / 2,
          15 * CONVERSION_RATIO,
          0,
          2 * Math.PI
        )
        context.fill()
      }

      requestId = requestAnimationFrame(render)
    }

    render()

    const resize = () => {
      let canvas = ref.current as HTMLCanvasElement
      let context = canvas.getContext("2d") as CanvasRenderingContext2D
      let ratio = getPixelRatio(context)
      let width = parseFloat(
        getComputedStyle(parent.current as HTMLDivElement)
          .getPropertyValue("width")
          .slice(0, -2)
      )
      let height = parseFloat(
        getComputedStyle(parent.current as HTMLDivElement)
          .getPropertyValue("height")
          .slice(0, -2)
      )

      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(requestId as number)
      window.removeEventListener("resize", resize)
    }
  }, [mouse, canvasState])

  const onPointerDown = useCallback(() => {
    setPressed()
    setDragStart({ x, y })
    console.log("press")
  }, [mouse])

  const onPointerMove = useCallback(() => {
    if (!canvasState.pressed) return
    setCurrentPosition({ x, y })
  }, [mouse])

  const onPointerUp = useCallback(() => {
    setReleased()
    setDragEnd({ x, y })
  }, [mouse])

  return (
    <div
      ref={parent}
      className={cn(
        "w-4/5 max-w-screen-lg bg-white rounded aspect-video border overflow-hidden flex items-center justify-center text-4xl",
        {
          // "cursor-none": tool == CanvasTool.Stamp,
        }
      )}
    >
      <canvas
        tabIndex={1}
        ref={ref}
        {...{
          onPointerDown,
          onPointerMove,
          onPointerUp,
        }}
        className="w-full h-full"
      />
    </div>
  )
}

export default Editor
