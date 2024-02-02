import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"
import type { CanvasMode, CanvasTool } from "@/types/Canvas"
import type { IconProps } from "@radix-ui/react-icons/dist/types"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export type Tool = {
  title: String
  description: String
  type: CanvasTool
  initialMode?: CanvasMode
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  shortcut: String
}

const ToolButton = ({
  title,
  description,
  type,
  icon: Icon,
  shortcut,
  setTool,
  setMode,
  tool,
}: Tool & {
  tool: CanvasTool
  setTool: (tool: CanvasTool) => void
  setMode: (tool: CanvasMode) => void
}) => {
  return (
    <HoverCard openDelay={3000}>
      <button
        onClick={() => {
          setTool(type)
        }}
        className={cn(
          "w-8 h-8 rounded-[0.5rem] grid place-items-center border border-dashed border-transparent transition-colors hover:bg-white/10 ga",
          {
            "bg-lime-400/15 text-lime-300 hover:bg-lime-400/15 border-lime-300":
              tool == type,
          }
        )}
      >
        <HoverCardTrigger className="w-full h-full grid place-items-center">
          <Icon />
        </HoverCardTrigger>
      </button>
      <HoverCardContent
        side="right"
        sideOffset={15}
        className="shadow-none rounded-xl p-0 overflow-hidden border-none"
      >
        <header className="bg-neutral-800 flex w-full px-3 h-10 items-center justify-between">
          <div className="flex items-center gap-2 text-lime-300">
            <div className="p-1 bg-lime-300/10 rounded-lg">
              <Icon />
            </div>
            <h2 className="text-sm">{title}</h2>
          </div>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-600 bg-neutral-700 px-1.5 font-mono text-[10px] font-medium text-neutral-200 opacity-100">
            <span className="text-xs">⌘</span> {shortcut}
          </kbd>
        </header>
        <p className="text-xs font-normal p-3 bg-neutral-900 text-white">
          {description}
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default ToolButton
