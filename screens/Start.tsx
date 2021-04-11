import React from "react"
import { StyleSheet } from "react-native"

type GameStartState = "Launching" | "WillTransitionIn" | "WillTransitionOut"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BOARD_SIZES = [3, 4, 5, 6]

type Props = {
  onChangeSize: () => void
  onStartGame: () => void
  size: number
}

export const Start: React.FC<Props> = (_props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const state: { transitionState: GameStartState } = {
    transitionState: "Launching",
  }

  return null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
