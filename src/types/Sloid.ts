import { Modifier } from "@/types/Modifier"
import { SloidNode } from "@/types/SloidNode"

export interface Sloid {
  modifiers: Array<Modifier>
  tree?: SloidNode | null
}
