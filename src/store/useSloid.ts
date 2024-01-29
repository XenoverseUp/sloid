import { textSlide } from "@/lib/Sloid"
import type { Modifier } from "@/types/Modifier"
import type { Sloid } from "@/types/Sloid"
import { SloidNodeType, SloidTextNode } from "@/types/SloidNode"
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { useCallback } from "react"

type ISloidReturn = {
  getAllSlides: () => Array<Sloid>
  getSlide: (i: number) => Sloid
  add: (slide: Sloid) => void
  update: (i: number, slide: Sloid) => void
  remove: (i: number) => void
  rearrange: (a: number, b: number) => void
}

type ICurrentSlideReturn = {
  currentSlide: number
  increment: () => void
  decrement: () => void
  set: (i: number) => void
}

export const slidesAtom = atom<Array<Sloid>>([textSlide("Hello")])
export const currentSlideAtom = atom<number>(0)

export const useCurrentSlide = (): ICurrentSlideReturn => {
  const [current, setCurrent] = useAtom(currentSlideAtom)
  const slides = useAtomValue(slidesAtom)

  const increment = useCallback(
    () =>
      setCurrent((state) =>
        state !== slides.length - 1 ? state + 1 : slides.length - 1
      ),
    [slides]
  )

  const decrement = useCallback(
    () => setCurrent((state) => (state == 0 ? 0 : state - 1)),
    [slides]
  )

  const set = useCallback(
    (i: number) => {
      if (i >= slides.length || i < 0)
        throw new Error("Array index out of bounds.")
      setCurrent(i)
    },
    [slides]
  )

  return {
    currentSlide: current,
    increment,
    decrement,
    set,
  } as ICurrentSlideReturn
}

export const useSlides = (): ISloidReturn => {
  const [slides, setSlides] = useAtom(slidesAtom)
  const setCurrent = useSetAtom(currentSlideAtom)

  const add = useCallback(
    (slide: Sloid) => setSlides((state) => [...state, slide]),
    []
  )

  const remove = useCallback((i: number) => {
    setSlides((state) => state.toSpliced(i, 1))
    setCurrent(i - 1)
  }, [])

  const getSlide = useCallback((i: number) => slides.at(i), [slides])

  const rearrange = useCallback((a: number, b: number) => {}, [])

  return {
    getAllSlides: () => slides,
    add,
    getSlide,
    remove,
    rearrange,
  } as ISloidReturn
}
