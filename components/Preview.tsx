import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { ImageSource } from "../types"
import { calculateItemSize, itemMargin } from "../utils/grid"

type Props = {
  image: ImageSource
  boardSize: number
}

export const Preview: React.FC<Props> = ({ image, boardSize }) => {
  const itemSize = calculateItemSize(boardSize)
  const scaledSize = itemSize < 80 ? itemSize * 2 + itemMargin : itemSize

  const style = {
    width: scaledSize,
    height: scaledSize,
  }

  return (
    <View style={styles.container}>
      <Image style={[styles.image, style]} source={image ?? { uri: "" }} />
    </View>
  )
}

Preview.defaultProps = {
  image: null,
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#1F1E2A",
  },
  image: {
    resizeMode: "contain",
  },
})
