import { CanvasTool } from "@/types/Canvas"

type PropertyPanelProps = {
  tool: CanvasTool
}

const PropertyPanel = ({ tool }: PropertyPanelProps) => {
  return (
    <div className="w-64 h-full border-l grid place-items-center text-sm text-neutral-400 flex-shrink-0 bg-muted">
      Tool: {tool.toString()}
    </div>
  )
}

export default PropertyPanel
