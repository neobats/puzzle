/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react"
import { Animated, Image, StyleSheet, View } from "react-native"
import { BoardState, Puzzle } from "../types"
import {
  calculateContainerSize,
  calculateItemPosition,
  calculateItemSize,
  calculateMargin,
  imageSizeMultiplier,
} from "../utils"

type Props = {
  puzzle: Puzzle
  teardown: boolean
  image?: { uri: string } | null
  previousMove?: number | null
  onMoveSquare: (square: number) => void
  onTransitionIn: () => void
  onTransitionOut: () => void
}

type AnimatedValue = {
  scale: Animated.Value
  top: Animated.Value
  left: Animated.Value
}

export const Board: React.FC<Props> = (props) => {
  const [boardState, setBoardState] = useState<BoardState>("WillTransitionIn")
  const animatedValues = useRef<AnimatedValue[]>([])

  const { onTransitionIn, image } = props
  const { size, board, empty } = props.puzzle

  // replacing the constructor
  board.forEach((square, index) => {
    const { top, left } = calculateItemPosition(size, index)

    animatedValues.current[square] = {
      scale: new Animated.Value(1),
      top: new Animated.Value(top),
      left: new Animated.Value(left),
    }
  })

  useEffect(() => {
    setBoardState("DidTransitionIn")
    console.log(boardState)
    onTransitionIn()
  }, [])

  const containerSize = calculateContainerSize()
  const containerStyle = {
    width: containerSize,
    height: containerSize,
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderSquare = (square: number, index: number) => {
    if (square === empty) return null

    const itemSize = calculateItemSize(size)

    const itemStyle = {
      position: "absolute",
      width: itemSize,
      height: itemSize,
      overflow: "hidden",
      transform: [
        { translateX: animatedValues.current[square].left },
        { translateY: animatedValues.current[square].top },
        { scale: animatedValues.current[square].scale },
      ],
    }

    const [getImageSize, getMargin] = [
      imageSizeMultiplier,
      calculateMargin,
    ].map((x) => x(itemSize))

    const imageStyle = {
      position: "absolute",
      width: getImageSize(size),
      height: getImageSize(size),

      transform: [
        { translateX: getMargin(square % size) },
        { translateY: getMargin(square / size) },
      ],
    }

    return (
      <Animated.View key={square} style={itemStyle as any}>
        <Image style={imageStyle as any} source={image || { uri: "" }} />
      </Animated.View>
    )
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {board.map(renderSquare)}
    </View>
  )
}

Board.defaultProps = {
  image: null,
  previousMove: null,
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#1F1E2A",
  },
  title: {
    fontSize: 24,
    color: "#69B8FF",
  },
})
