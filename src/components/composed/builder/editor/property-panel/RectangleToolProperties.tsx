import Fill from "@/components/composed/builder/editor/property-panel/fill"
import Stroke from "@/components/composed/builder/editor/property-panel/stroke"
import ZIndex from "@/components/composed/builder/editor/property-panel/z-index"

function RectangleToolProperties() {
  return (
    <div className="w-full">
      <Fill />
      <Stroke />
      <ZIndex />
    </div>
  )
}

export default RectangleToolProperties
