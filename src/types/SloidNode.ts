export interface SloidNode {
  type: SloidNodeType
}

export enum SloidNodeType {
  TEXT,
  FIGURE,
  VECTOR,
}

export interface SloidTextNode extends SloidNode {
  text?: String
  fontFamily: String
  size: number
  color: String
  background: String
}

export interface SloidFigureNode extends SloidNode {}

export interface SloidVectorNode extends SloidNode {}
