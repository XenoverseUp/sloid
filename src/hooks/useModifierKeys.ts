import { useMap } from "@/hooks/useMap"
import { useEffect, useState } from "react"

const useModifierKeys = (): {
  shiftKey: boolean
  metaKey: boolean
  ctrlKey: boolean
  altKey: boolean
} => {
  const [keymap, actions] = useMap<string, boolean>([
    ["ctrl", false],
    ["meta", false],
    ["alt", false],
    ["shift", false],
  ])

  useEffect(() => {
    const check = (e: KeyboardEvent) => {
      if (e.metaKey) actions.set("meta", true)
      else actions.set("meta", false)
      if (e.shiftKey) actions.set("shift", true)
      else actions.set("shift", false)
      if (e.ctrlKey) actions.set("ctrl", true)
      else actions.set("ctrl", false)
      if (e.altKey) actions.set("alt", true)
      else actions.set("alt", false)
    }

    window.addEventListener("keydown", check)
    window.addEventListener("keyup", check)

    return () => {
      window.removeEventListener("keydown", check)
      window.removeEventListener("keyup", check)
    }
  }, [])

  return {
    shiftKey: keymap.get("shift") as boolean,
    metaKey: keymap.get("meta") as boolean,
    ctrlKey: keymap.get("ctrl") as boolean,
    altKey: keymap.get("alt") as boolean,
  }
}

export default useModifierKeys
