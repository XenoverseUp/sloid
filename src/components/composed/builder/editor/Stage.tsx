import Editor from "@/components/composed/builder/editor/Editor"
import PropertyPanel from "@/components/composed/builder/editor/PropertyPanel"
import Toolbar from "@/components/composed/builder/editor/toolbar/Toolbar"
import useCanvasState from "@/hooks/useCanvasState"
import useToolProperties from "@/hooks/useToolProperties"
import { CanvasTool, CanvasState } from "@/types/Canvas"
import { useState } from "react"

function Stage() {
  const {
    canvasState,
    setCanvasTool,
    setCanvasMode,
    setCurrentPosition,
    setDragEnd,
    setDragStart,
    setPressed,
    setReleased,
    clearCanvasMode,
  } = useCanvasState()
  const a = useToolProperties()

  return (
    <div className="w-full h-full flex bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <main className="flex-grow h-full flex items-center justify-center relative">
        <Toolbar
          className="absolute top-1/2 -translate-y-1/2 left-3"
          tool={canvasState.tool}
          setTool={setCanvasTool}
          setMode={setCanvasMode}
        />
        <Editor
          {...{
            canvasState,
            setCanvasMode,
            setCurrentPosition,
            setDragEnd,
            setDragStart,
            setPressed,
            setReleased,
            clearCanvasMode,
          }}
        />
      </main>
      <PropertyPanel tool={canvasState.tool} />
    </div>
  )
}

export default Stage
