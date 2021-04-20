import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native"
import { Func } from "../types"

const getValue = (pressed: boolean, disabled: boolean) => {
  const base = disabled ? 0.5 : 1
  const delta = disabled ? 0.1 : 0.3

  return pressed ? base - delta : base
}

type Props = {
  title: string
  onPress: Func
  disabled: boolean
  height?: number
  color?: string
  fontSize?: number
  borderRadius?: number
}

export const Button: React.FC<Props> = ({
  color,
  title,
  height,
  borderRadius,
  fontSize,
  disabled,
  onPress,
}) => {
  const [isPressed, togglePressed] = useState(false)
  const value = new Animated.Value(getValue(false, disabled))
  const previousPressed = useRef(false)
  const previousValue = useRef(-1)

  useEffect(() => {
    Animated.timing(value, {
      duration: 200,
      toValue: getValue(isPressed, disabled),
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start()
  }, [
    isPressed,
    value,
    disabled,
    previousPressed.current,
    previousValue.current,
  ])

  const handlePressIn = () => togglePressed(true)
  const handlePressOut = () => togglePressed(false)

  const animatedColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["black", color || ""],
  })
  const animatedScale = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  })

  const containerStyle = {
    borderColor: animatedColor,
    borderRadius: borderRadius || 0,
    height: height || 60,
    transform: [{ scale: animatedScale }],
  }

  const titleStyle = {
    color: animatedColor,
    fontSize: fontSize || 16,
  }

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={[styles.title, titleStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
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
