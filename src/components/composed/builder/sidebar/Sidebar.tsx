import { ScrollArea } from "@/components/ui/scroll-area"
import SlidePreview from "@/components/composed/builder/sidebar/SlidePreview"
import sidebarBackground from "$/img/sidebar.jpeg"
import Image from "next/image"
import { useCurrentSlide, useSlides } from "@/store/useSloid"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { textSlide } from "@/lib/Sloid"
import { useCallback, useEffect, useRef } from "react"
import { SloidTextNode } from "@/types/SloidNode"
import { usePrevious } from "@uidotdev/usehooks"

const Sidebar = () => {
  const { getAllSlides, add, remove } = useSlides()
  const { currentSlide, increment, decrement, set } = useCurrentSlide()
  const previous = usePrevious(getAllSlides().length)
  const addButton = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previous < getAllSlides().length) {
      set(getAllSlides().length - 1)
      addButton.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [getAllSlides().length])

  return (
    <ScrollArea type="scroll" className="w-full h-full relative bg-muted">
      <div
        className="space-y-3 px-3 py-4 z-10 backdrop-blur-md focus-visible:outline-none"
        tabIndex={1}
        onKeyDown={(e) => {
          if (e.key == "ArrowDown") increment()
          if (e.key == "ArrowUp") decrement()
          if (e.ctrlKey && e.key == "q")
            if (getAllSlides().length > 1) remove(currentSlide)
        }}
      >
        {getAllSlides().map((slide, i) => {
          return (
            <SlidePreview
              key={`slide-preview-${i}`}
              selected={i == currentSlide}
              index={i}
              text={(slide.tree as SloidTextNode).text}
            />
          )
        })}
        <div className="flex gap-2 w-full" ref={addButton}>
          <div className="flex flex-col items-center justify-center w-4"></div>
          <button
            onClick={() => {
              add(textSlide("Slide " + getAllSlides().length.toString()))
            }}
            className="group gap-1 bg-white/30 transition-colors hover:border-slate-400 flex-grow aspect-video rounded-md border border-slate-300 border-dashed text-zinc-900 flex flex-col justify-center items-center"
          >
            <PlusCircledIcon
              width={30}
              height={30}
              className="opacity-30 fill-border rotate-90 scale-95 group-hover:scale-100 group-hover:opacity-60 group-hover:rotate-0 transition-[opacity,transform]"
            />
            <span className="text-xs scale-75 transition-all delay-0 group-hover:delay-500 opacity-0 h-0 overflow-hidden group-hover:opacity-50 group-hover:h-4 group-hover:scale-100">
              Add Slide
            </span>
          </button>
        </div>
      </div>
      <Image
        src={sidebarBackground}
        alt="background"
        priority
        fill
        placeholder="blur"
        className="opacity-0 pointer-events-none -z-10 object-cover"
      />
    </ScrollArea>
  )
}

export default Sidebar
