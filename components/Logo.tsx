import React from "react"
import { Image, StyleSheet } from "react-native"
import logo from "../assets/logo.png"

export default function Logo() {
  return <Image style={styles.image} source={logo} />
}

Logo.propTypes = {}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    aspectRatio: 285 / 84,
  },
})
