import { Sloid } from "@/types/Sloid"
import { SloidNodeType, SloidTextNode } from "@/types/SloidNode"

export const emptySlide: Sloid = {
  modifiers: [],
  tree: null,
}

export const textSlide = (text: String): Sloid => ({
  modifiers: [],
  tree: {
    text,
    fontFamily: "",
    background: "",
    color: "",
    size: 12,
    type: SloidNodeType.TEXT,
  } as SloidTextNode,
})
