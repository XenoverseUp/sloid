import { Element, Frame, Layer } from "@/types/Canvas"
import { useCallback, useState } from "react"

const useFrame = () => {
  const [frame, setFrame] = useState<Frame>({
    maxIndex: 0,
    layers: [{ index: 0, elements: [] } as Layer],
  })

  const getMaxIndex = useCallback(() => frame.maxIndex, [frame])
  const getLayers = useCallback(() => frame.layers, [frame])
  const getLayerElements = useCallback(
    (i: number) => frame.layers.at(i)?.elements,
    [frame]
  )
  const addElement = useCallback(
    (element: Element) =>
      setFrame(({ maxIndex, layers }) => ({
        maxIndex: maxIndex,
        layers: layers.map((layer: Layer) => {
          if (layer.index !== maxIndex)
            return JSON.parse(JSON.stringify(layer)) as Layer

          return { index: maxIndex, elements: [...layer.elements, element] }
        }),
      })),
    [frame]
  )

  return { getLayers, getLayerElements, getMaxIndex, addElement }
}

export default useFrame
