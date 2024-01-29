import { cn } from "@/lib/utils"
import { useCurrentSlide } from "@/store/useSloid"

const SlidePreview = ({
  index,
  selected = false,
  text = "",
}: {
  index: number
  selected?: boolean
  text?: String
}) => {
  const { set } = useCurrentSlide()

  return (
    <div onClick={() => set(index)} className="flex gap-2 w-full">
      <div className="flex flex-col items-center justify-center w-4">
        <p
          className={cn(
            "text-muted-foreground text-xs font-medium opacity-75",
            {
              "font-bold opacity-100": selected,
            }
          )}
        >
          {index + 1}
        </p>
      </div>
      <div
        className={cn(
          "flex-grow aspect-video rounded-md border bg-white text-zinc-900 grid place-items-center",
          {
            "ring-4": selected,
          }
        )}
      >
        {text}
      </div>
    </div>
  )
}

export default SlidePreview
