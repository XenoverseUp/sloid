import { Case, Switch, When } from "react-if"
import { cn } from "@/lib/utils"
import { CanvasMode, CanvasState, CanvasTool, Point } from "@/types/Canvas"
import { useMap, useMouse } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"
import rect from "@/components/composed/builder/editor/element/rect"
import circle from "@/components/composed/builder/editor/element/circle"
import useModifierKeys from "@/hooks/useModifierKeys"

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

export default function SVGEditor({
  canvasState,
  clearCanvasMode,
  setCanvasMode,
  setCurrentPosition,
  setDragEnd,
  setDragStart,
  setPressed,
  setReleased,
}: EditorProps) {
  const canvas = useRef<SVGSVGElement>(null)
  const [mouse] = useMouse()
  const [mouseX, setMouseX] = useState<number>(-999)
  const [mouseY, setMouseY] = useState<number>(-999)
  const modifierKeys = useModifierKeys()

  useEffect(() => {
    const rect: DOMRect = (
      canvas.current as SVGSVGElement
    ).getBoundingClientRect()
    setMouseX(((mouse.x - rect.x) / rect.width) * resolution)
    setMouseY(((mouse.y - rect.y) / rect.width) * resolution)
  }, [mouse])

  const onPointerDown = useCallback(() => {
    setPressed()
    setDragStart({ x: mouseX, y: mouseY } as Point)
    setCurrentPosition({ x: mouseX, y: mouseY } as Point)
  }, [mouse])

  const onPointerMove = useCallback(() => {
    if (!canvasState.pressed) return
    setCurrentPosition({ x: mouseX, y: mouseY } as Point)
  }, [mouse])

  const onPointerUp = useCallback(() => {
    setReleased()
    setDragEnd({ x: mouseX, y: mouseY } as Point)
    // Add to frame
  }, [mouse])

  return (
    <div
      className={cn(
        "w-4/5 max-w-screen-lg bg-white rounded aspect-video border overflow-hidden flex items-center justify-center text-4xl"
      )}
    >
      <svg
        viewBox="0 0 1024 576"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={canvas}
        {...{
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerLeave: onPointerUp,
        }}
      >
        <When condition={canvasState.pressed}>
          <Switch>
            <Case condition={canvasState.mode == CanvasMode.Inserting}>
              <Switch>
                <Case condition={canvasState.tool == CanvasTool.Square}>
                  <Switch>
                    <Case
                      condition={!modifierKeys.shiftKey && !modifierKeys.altKey}
                    >
                      {rect({
                        square: false,
                        mirror: false,
                        x: Math.min(
                          canvasState.dragStart.x,
                          canvasState.current.x
                        ),
                        y: Math.min(
                          canvasState.dragStart.y,
                          canvasState.current.y
                        ),
                        width: Math.abs(
                          canvasState.dragStart.x - canvasState.current.x
                        ),
                        height: Math.abs(
                          canvasState.dragStart.y - canvasState.current.y
                        ),
                        className: "stroke-lime-500 stroke-2",
                      })}
                    </Case>
                    <Case
                      condition={!modifierKeys.shiftKey && modifierKeys.altKey}
                    >
                      {rect({
                        square: false,
                        mirror: true,
                        x: canvasState.dragStart.x,
                        y: canvasState.dragStart.y,
                        radiusX: Math.abs(
                          canvasState.dragStart.x - canvasState.current.x
                        ),
                        radiusY: Math.abs(
                          canvasState.dragStart.y - canvasState.current.y
                        ),
                        className: "stroke-lime-500 stroke-2",
                      })}
                    </Case>
                  </Switch>
                </Case>
                <Case condition={canvasState.tool == CanvasTool.Round}>
                  {circle({
                    mirror: false,
                    x: Math.min(canvasState.dragStart.x, canvasState.current.x),
                    y: Math.min(canvasState.dragStart.y, canvasState.current.y),
                    width: Math.abs(
                      canvasState.dragStart.x - canvasState.current.x
                    ),
                    height: Math.abs(
                      canvasState.dragStart.y - canvasState.current.y
                    ),
                    className: "stroke-lime-500 stroke-2",
                  })}
                </Case>
              </Switch>
            </Case>
          </Switch>
        </When>
      </svg>
    </div>
  )
}
