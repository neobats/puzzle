import { Dimensions, PixelRatio } from "react-native"

export const itemMargin = 4 as const

export const containerPadding = 6 as const

export const imageSizeMultiplier = (itemSize: number) => (size: number) =>
  itemSize * size + (itemMargin * size - 1)

export const calculateMargin = (itemSize: number) => (toFloor: number) =>
  Math.floor(toFloor) * (itemSize + itemMargin)

const calculatePadding = (itemSize: number) => (toFloor: number) =>
  calculateMargin(itemSize)(toFloor) + containerPadding

export function calculateContainerSize() {
  return Dimensions.get("window").width - 20
}

export function calculateItemSize(columns: number) {
  return PixelRatio.roundToNearestPixel(
    (calculateContainerSize() -
      containerPadding * 2 -
      itemMargin * (columns - 1)) /
      columns,
  )
}

export function calculateItemPosition(columns: number, index: number) {
  const itemSize = calculateItemSize(columns)
  const calc = calculatePadding(itemSize)
  return {
    top: calc(index / columns),
    left: calc(index % columns),
  }
}
