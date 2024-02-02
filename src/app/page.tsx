"use client"

import Stage from "@/components/composed/builder/editor/Stage"
import Sidebar from "@/components/composed/builder/sidebar/Sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Home() {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow">
      <ResizablePanel defaultSize={15} minSize={15} maxSize={20}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle className="" />
      <ResizablePanel defaultSize={85}>
        <Stage />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
