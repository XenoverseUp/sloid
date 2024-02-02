export enum CanvasTool {
  Cursor,
  SelectionNet,
  Text,
  Round,
  Square,
  Image,
  Eraser,
  Line,
  Stamp,
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

export interface CanvasState {
  mode: CanvasMode
  tool: CanvasTool
  pressed: boolean
  released: boolean
  dragStart?: Point | null
  current?: Point | null
  dragEnd?: Point | null
}
