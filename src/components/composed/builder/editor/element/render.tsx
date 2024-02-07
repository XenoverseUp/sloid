import Round from "@/components/composed/builder/editor/element/round"

import Rect from "@/components/composed/builder/editor/element/rect"
import { Circle, Element, Rectangle } from "@/types/Canvas"

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
  } else if (element.type == "circle") {
    const { cx, cy, radiusX, radiusY, id, style } = element as Circle
    return (
      <Round
        {...{
          mirror: true,
          x: cx,
          y: cy,
          radiusX,
          radiusY,
          id,
          className: "stroke-lime-500 stroke-2",
        }}
      />
    )
  }
}

export default render
