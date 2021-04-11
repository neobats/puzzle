import React from "react"
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { Func } from "../types"

// const getValue = (pressed: boolean, disabled: boolean) => {
//   const base = disabled ? 0.5 : 1
//   const delta = disabled ? 0.1 : 0.3

//   return pressed ? base - delta : base
// }

type Props = {
  title: string
  onPress: Func
  disabled?: boolean
  height?: number
  color?: string
  fontSize?: number
  borderRadius?: number
}

export const Button: React.FC<Props> = ({ title, height }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.container, { height }]}>
        <Text>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

Button.defaultProps = {
  onPress: () => {
    return
  },
  disabled: false,
  color: "#0CE1C2",
  fontSize: 24,
  borderRadius: 100,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1E2A",
    borderWidth: 2,
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 24,
  },
})
