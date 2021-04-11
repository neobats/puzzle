import React from "react"
import { Image, ImageSourcePropType, StyleSheet } from "react-native"
import logo from "../assets/logo.png"

export function Logo() {
  return <Image style={styles.image} source={logo as ImageSourcePropType} />
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    aspectRatio: 285 / 84,
  },
})
