import Editor from "@/components/composed/builder/editor/Editor"
import PropertyPanel from "@/components/composed/builder/editor/PropertyPanel"
import ToolPicker from "@/components/composed/builder/editor/ToolPicker"
import EditorTool from "@/lib/EditorTool"
import { useState } from "react"

function Stage() {
  const [tool, setTool] = useState<EditorTool>(EditorTool.Cursor)
  const [toolProps, setToolProps] = useState()

  return (
    <div className="w-full h-full flex bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <main className="flex-grow h-full flex items-center justify-center relative">
        <ToolPicker
          className="absolute top-1/2 -translate-y-1/2 left-3"
          {...{ tool, setTool }}
        />
        <Editor {...{ tool }} />
      </main>
      <PropertyPanel />
    </div>
  )
}

export default Stage
