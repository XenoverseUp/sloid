import EditorTool from "@/lib/EditorTool"
import { cn, getPixelRatio } from "@/lib/utils"
import { useList, useMouse } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"

type EditorProps = {
  tool: EditorTool
}

const resolution = 1024

const Editor = ({ tool }: EditorProps) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const parent = useRef<HTMLDivElement>(null)
  const [mouse] = useMouse()
  const [x, setX] = useState<number | null>(null)
  const [y, setY] = useState<number | null>(null)
  const stageData = useRef<Array<Array<number>>>([]) // useList

  useEffect(() => {
    let requestId: number | null = null
    const render = () => {
      let canvas = ref.current as HTMLCanvasElement
      let context = canvas.getContext("2d") as CanvasRenderingContext2D
      let ratio = getPixelRatio(context)
      let width = parseFloat(
        getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
      )
      let height = parseFloat(
        getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
      )

      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      setX(((mouse.x - canvas.getBoundingClientRect().x) / width) * ratio)
      setY(((mouse.y - canvas.getBoundingClientRect().y) / height) * ratio)

      stageData.current.forEach(([x, y]) => {
        context.beginPath()
        context.arc(x * width, y * height, canvas.height / 16, 0, 2 * Math.PI)
        context.fill()
      })

      if (x !== null) {
        context.beginPath()
        context.arc(
          (x as number) * width,
          (y as number) * height,
          canvas.height / 16,
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
  }, [mouse])

  const click = useCallback(() => {
    stageData.current.push([x as number, y as number])
    console.log(stageData)
  }, [mouse])

  return (
    <div
      ref={parent}
      className={cn(
        "w-4/5 max-w-screen-lg bg-white rounded aspect-video border overflow-hidden flex items-center justify-center text-4xl",
        {
          "cursor-none": tool == EditorTool.Stamp,
        }
      )}
    >
      <canvas
        tabIndex={1}
        ref={ref}
        onMouseDown={click}
        className="w-full h-full"
      />
    </div>
  )
}

export default Editor
