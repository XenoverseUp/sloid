import { CanvasMode, CanvasState, CanvasTool, Point } from "@/types/Canvas"
import { useCallback, useState } from "react"

const useCanvasState = (
  initialState: CanvasState = {
    mode: CanvasMode.None,
    tool: CanvasTool.Cursor,
    pressed: false,
    released: true,
  }
) => {
  const [state, setState] = useState<CanvasState>(initialState)

  const setCanvasMode = useCallback(
    (mode: CanvasMode) => setState((state) => ({ ...state, mode })),
    [state]
  )

  const clearCanvasMode = useCallback(
    () => setState((state) => ({ ...state, mode: CanvasMode.None })),
    [state]
  )

  const setCanvasTool = useCallback(
    (tool: CanvasTool) => setState((state) => ({ ...state, tool })),
    [state]
  )

  const setPressed = useCallback(
    () => setState((state) => ({ ...state, pressed: true, released: false })),
    [state]
  )

  const setReleased = useCallback(
    () => setState((state) => ({ ...state, pressed: false, released: true })),
    [state]
  )

  const setDragStart = useCallback(
    (point: Point) => setState((state) => ({ ...state, dragStart: point })),
    [state]
  )

  const setDragEnd = useCallback(
    (point: Point) => setState((state) => ({ ...state, dragEnd: point })),
    [state]
  )

  const setCurrentPosition = useCallback(
    (point: Point) => setState((state) => ({ ...state, current: point })),
    [state]
  )

  return {
    canvasState: state,
    setCanvasMode,
    clearCanvasMode,
    setCanvasTool,
    setPressed,
    setReleased,
    setDragStart,
    setDragEnd,
    setCurrentPosition,
  }
}

export default useCanvasState
