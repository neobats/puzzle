import React from "react"

type Props = {
  onTouchStart?: (v: unknown) => void
  onTouchMove?: (v: unknown) => void
  onTouchEnd?: (v: unknown) => void
  enabled?: boolean
}

export const Draggable: React.FC<Props> = (_props) => {
  return null
}
Draggable.defaultProps = {
  enabled: true,
}
