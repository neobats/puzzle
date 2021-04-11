import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { LayoutAnimation, StyleSheet, View } from "react-native"
import { Button } from "../components/Button"
import { Logo } from "../components/Logo"
import { Toggle } from "../components/Toggle"
import { Func } from "../types"
import { configureTransition, sleep } from "../utils"

type GameStartState = "Launching" | "WillTransitionIn" | "WillTransitionOut"

const BOARD_SIZES = [3, 4, 5, 6]

type Props = {
  onChangeSize: Dispatch<SetStateAction<number>>
  onStartGame: Func
  size: number
}

export const Start: React.FC<Props> = ({ size, onChangeSize }) => {
  const [transitionState, setTransitionState] = useState<GameStartState>(
    "Launching",
  )

  useEffect(() => {
    const animate = async () => {
      await sleep(500)

      // work for Android
      await configureTransition(() => setTransitionState("WillTransitionIn"))

      const animation = LayoutAnimation.create(
        750,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      )

      LayoutAnimation.configureNext(animation)
      setTransitionState("WillTransitionIn")
    }
    animate()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>
      {transitionState !== "Launching" && (
        <View>
          <Toggle options={BOARD_SIZES} value={size} onChange={onChangeSize} />
        </View>
      )}
      {transitionState !== "Launching" && (
        <View>
          <Button
            title="Start Game"
            onPress={() => {
              return
            }}
          />
        </View>
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
