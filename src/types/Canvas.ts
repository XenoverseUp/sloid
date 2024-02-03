export enum CanvasTool {
  Cursor = "Cursor",
  SelectionNet = "SelectionNet",
  Text = "Text",
  Round = "Round",
  Square = "Square",
  Image = "Image",
  Eraser = "Eraser",
  Line = "Line",
  Stamp = "Stamp",
}

export enum CanvasMode {
  None,
  Inserting,
  Translating,
  Scaling,
  Selecting,
  Drawing,
}

export type Point = {
  x: number
  y: number
}

export type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

export interface CanvasState {
  mode: CanvasMode
  tool: CanvasTool
  pressed: boolean
  released: boolean
  dragStart: Point
  current: Point
  dragEnd: Point
}
