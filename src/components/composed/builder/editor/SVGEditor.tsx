import { Case, Switch, When } from "react-if"
import { cn } from "@/lib/utils"
import {
  CanvasMode,
  CanvasState,
  CanvasTool,
  Element,
  Layer,
  Point,
  Rectangle,
} from "@/types/Canvas"
import { useMap, useMouse } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"
import Rect from "@/components/composed/builder/editor/element/rect"
import circle from "@/components/composed/builder/editor/element/circle"
import useModifierKeys from "@/hooks/useModifierKeys"
import useFrame from "@/hooks/useFrame"
import { v4 as uuid } from "uuid"
import render from "@/components/composed/builder/editor/element/render"
import { UUID } from "crypto"

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
  const { getMaxIndex, getLayerElements, addElement, getLayers } = useFrame()

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
    if (canvasState.released) return

    setDragEnd({ x: canvasState.current.x, y: canvasState.current.y } as Point)
    canvasState.dragEnd = canvasState.current

    if (canvasState.mode == CanvasMode.Inserting) {
      switch (canvasState.tool) {
        case CanvasTool.Square: {
          const r: Rectangle = {
            type: "rectangle",
            id: uuid() as UUID,
            x: Math.min(canvasState.dragStart.x, canvasState.dragEnd.x),
            y: Math.min(canvasState.dragStart.y, canvasState.dragEnd.y),
            width: Math.abs(canvasState.dragStart.x - canvasState.dragEnd.x),
            height: Math.abs(canvasState.dragStart.y - canvasState.dragEnd.y),
            style: {
              fill: "#ff0000",
              stroke: 2,
              strokeColor: "#00ff00",
              strokeStyle: "dashed",
            },
          }

          addElement(r)
        }
      }
    }

    setReleased()
  }, [mouse])

  const onPointerLeave = () => {
    setReleased()
  }

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
          onPointerLeave,
        }}
      >
        {getLayerElements(0)!.map((element: Element) => render(element))}
        <When condition={canvasState.pressed}>
          <Switch>
            <Case condition={canvasState.mode == CanvasMode.Inserting}>
              <Switch>
                <Case condition={canvasState.tool == CanvasTool.Square}>
                  <Rect
                    x={Math.min(canvasState.dragStart.x, canvasState.current.x)}
                    y={Math.min(canvasState.dragStart.y, canvasState.current.y)}
                    width={Math.abs(
                      canvasState.dragStart.x - canvasState.current.x
                    )}
                    height={Math.abs(
                      canvasState.dragStart.y - canvasState.current.y
                    )}
                    className="stroke-lime-500 stroke-2"
                    id="0000-0000-0000-0000-0000"
                  />
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
