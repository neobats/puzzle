import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Animated, StyleSheet, View } from "react-native"
import { Button } from "../components/Button"
import { Logo } from "../components/Logo"
import { Toggle } from "../components/Toggle"
import { configureTransition, sleep } from "../utils"

type GameStartState = "Launching" | "WillTransitionIn" | "WillTransitionOut"

const BOARD_SIZES = [3, 4, 5, 6]

type Props = {
  onChangeSize: Dispatch<SetStateAction<number>>
  onStartGame: () => void
  size: number
}

export const Start: React.FC<Props> = ({ size, onStartGame, onChangeSize }) => {
  const [transitionState, setTransitionState] = useState<GameStartState>(
    "Launching",
  )

  const toggleOpacity = new Animated.Value(0)
  const buttonOpacity = new Animated.Value(0)

  useEffect(() => {
    const animate = async () => {
      await sleep(500)

      // work for Android
      await configureTransition(() => setTransitionState("WillTransitionIn"))

      Animated.timing(toggleOpacity, {
        toValue: 1,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }).start()

      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start()
    }
    animate()
  }, [])

  const [buttonStyle] = useState({ opacity: buttonOpacity })
  const [toggleStyle] = useState({ opacity: toggleOpacity })

  const handlePressStart = async () => {
    await configureTransition(() => {
      setTransitionState("WillTransitionOut")
      onStartGame()
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>
      {transitionState !== "Launching" && (
        <Animated.View style={toggleStyle}>
          <Toggle options={BOARD_SIZES} value={size} onChange={onChangeSize} />
        </Animated.View>
      )}
      {transitionState !== "Launching" && (
        <Animated.View style={buttonStyle}>
          <Button
            title="Start Game"
            onPress={handlePressStart}
            disabled={false}
          />
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    alignSelf: "stretch",
    paddingHorizontal: 40,
  },
})
