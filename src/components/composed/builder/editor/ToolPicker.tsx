import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import EditorTool from "@/lib/EditorTool"
import { cn } from "@/lib/utils"
import {
  CursorArrowIcon,
  DividerHorizontalIcon,
  EraserIcon,
  FontStyleIcon,
  ImageIcon,
  ShadowInnerIcon,
  SquareIcon,
  TargetIcon,
} from "@radix-ui/react-icons"
import type { IconProps } from "@radix-ui/react-icons/dist/types"
import type { ClassValue } from "clsx"
import {
  useRef,
  type Dispatch,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SetStateAction,
} from "react"

type ToolPickerProps = {
  tool: EditorTool
  setTool: Dispatch<SetStateAction<EditorTool>>
  className?: ClassValue
}

type Tool = {
  title: String
  description: String
  type: EditorTool
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  shortcut: String
}

const picker: Array<Tool> = [
  {
    title: "Cursor",
    description: "Selects, moves and edits elements on the slide.",
    type: EditorTool.Cursor,
    icon: CursorArrowIcon,
    shortcut: "0",
  },
  {
    title: "Text",
    description: "Creates a text on the slide.",
    type: EditorTool.Text,
    icon: FontStyleIcon,
    shortcut: "1",
  },
  {
    title: "Round",
    description: "Draws a circle on the slide.",
    type: EditorTool.Round,
    icon: ShadowInnerIcon,
    shortcut: "2",
  },
  {
    title: "Square",
    description: "Draws a rectangle on the slide.",
    type: EditorTool.Square,
    icon: SquareIcon,
    shortcut: "3",
  },
  {
    title: "Image",
    description:
      "Imports an image to the slide. You can edit its properties using the cursor.",
    type: EditorTool.Image,
    icon: ImageIcon,
    shortcut: "4",
  },
  {
    title: "Eraser",
    description: "Deletes elements from the slide.",
    type: EditorTool.Eraser,
    icon: EraserIcon,
    shortcut: "5",
  },
  {
    title: "Line",
    description: "Draws a straight or curved line.",
    type: EditorTool.Line,
    icon: DividerHorizontalIcon,
    shortcut: "6",
  },
  {
    title: "Stamp",
    description: "Puts a stamp onto the slide.",
    type: EditorTool.Stamp,
    icon: TargetIcon,
    shortcut: "7",
  },
]

const ToolPicker = ({ tool, setTool, className }: ToolPickerProps) => {
  return (
    <div
      className={cn(
        "bg-neutral-800 rounded-[0.75rem] p-1 flex flex-col gap-0.5 text-white font-medium shadow-lg",
        className
      )}
    >
      {picker.map((data) => (
        <ToolItem key={`item-${data.title}`} {...{ tool, setTool, ...data }} />
      ))}
    </div>
  )
}

const ToolItem = ({
  title,
  description,
  type,
  icon: Icon,
  shortcut,
  setTool,
  tool,
}: Tool & {
  tool: EditorTool
  setTool: Dispatch<SetStateAction<EditorTool>>
}) => {
  return (
    <HoverCard openDelay={3000}>
      <button
        onClick={() => {
          setTool(type)
        }}
        className={cn(
          "w-8 h-8 rounded-[0.5rem] grid place-items-center transition-colors hover:bg-white/10",
          {
            "bg-lime-400/15 text-lime-300 hover:bg-lime-400/15": tool == type,
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

export default ToolPicker
