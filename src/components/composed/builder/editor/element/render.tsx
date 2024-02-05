import Rect from "@/components/composed/builder/editor/element/rect"
import { Element, Rectangle } from "@/types/Canvas"

const render = (element: Element) => {
  if (element.type == "rectangle") {
    const { x, y, width, height, id, style } = element as Rectangle
    return (
      <Rect
        {...{
          x,
          y,
          width,
          height,
          className: "stroke-lime-500 stroke-2",
          id,
        }}
      />
    )
  }
}

export default render
