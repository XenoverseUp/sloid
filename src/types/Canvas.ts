import { UUID } from "crypto"

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

export interface CanvasState {
  mode: CanvasMode
  tool: CanvasTool
  pressed: boolean
  released: boolean
  dragStart: Point
  current: Point
  dragEnd: Point
}

export type Point = {
  x: number
  y: number
}

export type Element = {
  id: UUID
  type: "circle" | "rectangle"
}

export interface Rectangle extends Element {
  type: "rectangle"
  x: number
  y: number
  width: number
  height: number
  style: Style
}

export interface Circle extends Element {
  type: "circle"
  cx: number
  cy: number
  radiusX: number
  radiusY: number
  style: Style
}

type HSL = `hsl(${number}, ${number}%, ${number}%)`
type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | HSL

export type Style = {
  fill?: Color
  stroke: number
  strokeColor?: Color
  strokeStyle?: "solid" | "dotted" | "dashed" | "double"
}

export type Layer = {
  index: number
  elements: Array<Element>
}

export interface Frame {
  maxIndex: number
  layers: Array<Layer>
}
