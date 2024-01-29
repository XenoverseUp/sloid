import { useCurrentSlide, useSlides } from "@/store/useSloid"
import { SloidTextNode } from "@/types/SloidNode"
import { useEffect } from "react"

const Editor = () => {
  const { currentSlide } = useCurrentSlide()
  const { getSlide } = useSlides()

  return (
    <div className="w-full h-full flex items-center justify-center text-4xl">
      {(getSlide(currentSlide).tree as SloidTextNode).text}
    </div>
  )
}

export default Editor
