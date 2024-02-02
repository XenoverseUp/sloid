import { CanvasMode, CanvasTool } from "@/types/Canvas"
import type { ClassValue } from "clsx"
import type { Tool } from "@/components/composed/builder/editor/toolbar/ToolButton"
import { cn } from "@/lib/utils"
import {
  CursorArrowIcon,
  DividerHorizontalIcon,
  EraserIcon,
  FontStyleIcon,
  ImageIcon,
  MarginIcon,
  ShadowInnerIcon,
  SquareIcon,
  TargetIcon,
} from "@radix-ui/react-icons"
import ToolButton from "@/components/composed/builder/editor/toolbar/ToolButton"

type ToolPickerProps = {
  tool: CanvasTool
  setTool: (tool: CanvasTool) => void
  setMode: (mode: CanvasMode) => void
  className?: ClassValue
}

const picker: Array<Tool> = [
  {
    title: "Cursor",
    description: "Selects, moves and edits elements on the slide.",
    type: CanvasTool.Cursor,
    initialMode: CanvasMode.None,
    icon: CursorArrowIcon,
    shortcut: "0",
  },
  {
    title: "Selector",
    description: "Selects a region of the slide.",
    type: CanvasTool.SelectionNet,
    initialMode: CanvasMode.Selecting,
    icon: MarginIcon,
    shortcut: "1",
  },
  {
    title: "Text",
    description: "Creates a text on the slide.",
    type: CanvasTool.Text,
    icon: FontStyleIcon,
    shortcut: "1",
  },
  {
    title: "Round",
    description: "Draws a circle on the slide.",
    type: CanvasTool.Round,
    icon: ShadowInnerIcon,
    shortcut: "2",
  },
  {
    title: "Square",
    description: "Draws a rectangle on the slide.",
    type: CanvasTool.Square,
    icon: SquareIcon,
    shortcut: "3",
  },
  {
    title: "Image",
    description:
      "Imports an image to the slide. You can edit its properties using the cursor.",
    type: CanvasTool.Image,
    icon: ImageIcon,
    shortcut: "4",
  },
  {
    title: "Eraser",
    description: "Deletes elements from the slide.",
    type: CanvasTool.Eraser,
    icon: EraserIcon,
    shortcut: "5",
  },
  {
    title: "Line",
    description: "Draws a straight or curved line.",
    type: CanvasTool.Line,
    icon: DividerHorizontalIcon,
    shortcut: "6",
  },
  {
    title: "Stamp",
    description: "Puts a stamp onto the slide.",
    type: CanvasTool.Stamp,
    icon: TargetIcon,
    shortcut: "7",
  },
]

const Toolbar = ({ tool, setTool, setMode, className }: ToolPickerProps) => {
  return (
    <div
      className={cn(
        "bg-neutral-800 rounded-[0.75rem] p-1 flex flex-col gap-0.5 text-white font-medium shadow-lg",
        className
      )}
    >
      {picker.map((data) => (
        <ToolButton
          key={`item-${data.title}`}
          {...{ tool, setTool, setMode, ...data }}
        />
      ))}
    </div>
  )
}

export default Toolbar
