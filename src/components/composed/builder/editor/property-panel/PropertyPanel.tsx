import { ColorPalette } from "@/components/ui/color-palette"
import { CanvasTool } from "@/types/Canvas"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import {
  BlendingModeIcon,
  ColorWheelIcon,
  Cross1Icon,
} from "@radix-ui/react-icons"
import { Close as PopoverClose } from "@radix-ui/react-popover"
import { Case, Switch } from "react-if"
import RectangleToolProperties from "@/components/composed/builder/editor/property-panel/RectangleToolProperties"

type PropertyPanelProps = {
  tool: CanvasTool
}

const PropertyPanel = ({ tool }: PropertyPanelProps) => {
  return (
    <div className="w-64 h-full border-l grid place-items-center text-sm text-neutral-400 flex-shrink-0 bg-muted">
      {/* Tool: {tool.toString()} */}
      <Tabs defaultValue="account" className="w-full h-full">
        <TabsList className="h-10 text-xs flex px-3 items-center gap-2">
          <TabsTrigger
            value="account"
            className="data-[state=active]:font-medium data-[state=active]:text-primary"
          >
            Editor
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:font-medium data-[state=active]:text-primary"
          >
            Modifier
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="box-border flex flex-col items-center"
        >
          <Switch>
            <Case condition={tool == CanvasTool.Square}>
              <RectangleToolProperties />
            </Case>
          </Switch>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyPanel

const ColorPicker = () => (
  <Popover modal>
    <PopoverTrigger asChild>
      <Button>Pick color</Button>
    </PopoverTrigger>
    <PopoverContent
      side="left"
      align="start"
      sideOffset={10}
      className="w-auto p-0 pb-3 overflow- bg-neutral-800 rounded-lg"
    >
      <header className="text-secondary flex justify-between pl-3 pr-2 h-9">
        <h2 className="text-xs flex items-center gap-1">
          <span>Solid Color</span>
        </h2>
        <div className="flex items-center">
          <button className="grid place-items-center rounded-sm bg-transparent hover:bg-white/10 w-6 h-6 transition-colors">
            <BlendingModeIcon />
          </button>
          <PopoverClose className="grid place-items-center rounded-sm bg-transparent hover:bg-white/10 w-6 h-6 transition-colors">
            <Cross1Icon width={12} height={12} />
          </PopoverClose>
        </div>
      </header>
      <ColorPalette
        value="#000"
        onValueChange={(color) => {}}
        width={256}
        height={256}
        className="w-full"
      />
    </PopoverContent>
  </Popover>
)
