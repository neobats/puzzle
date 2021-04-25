import useInterval from "@use-it/interval"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native"
import { Board } from "../components/Board"
import { Button } from "../components/Button"
import { Preview } from "../components/Preview"
import { Stats } from "../components/Stats"
import { GameState, ImageSource, Puzzle } from "../types"
import { configureTransition, isSolved, movableSquares, move } from "../utils"

type Props = {
  puzzle: Puzzle
  image: ImageSource
  onChange: Dispatch<SetStateAction<Puzzle | null>>
  onQuit: (val?: unknown) => void
}

export const Game: React.FC<Props> = ({ puzzle, image, onChange, onQuit }) => {
  const startingState: GameState = image ? "WillTransitionIn" : "LoadingImage"
  const [moves, setMoves] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [delay, setDelay] = useState<1000 | null>(null)
  const [previousMove, setPreviousMove] = useState(-100)
  const [gameState, setGameState] = useState<GameState>(startingState)

  // configure on mount
  useEffect(() => {
    configureTransition()
  }, [])

  useEffect(() => {
    if (image && gameState === "LoadingImage") {
      configureTransition(() => {
        setGameState("WillTransitionIn")
      })
    }
  }, [image, gameState])

  // handle passage of time in elapsed
  useInterval(() => {
    setElapsed(elapsed + 1)
  }, delay)

  const requestTransitionOut = () => {
    setDelay(null)
    setGameState("RequestTransitionOut")
  }

  const handleBoardTransitionIn = () => {
    setDelay(1000)
  }

  const handleBoardTransitionOut = async () => {
    await configureTransition(() => {
      setGameState("WillTransitionOut")
    })
    onQuit()
  }

  const handlePressQuit = () => {
    Alert.alert(
      "Quit",
      "Do you want to quit and lose your progress on this puzzle?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Quit",
          style: "destructive",
          onPress: requestTransitionOut,
        },
      ],
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePressSquare = (square: number) => {
    if (!movableSquares(puzzle).includes(square)) return

    const updated = move(puzzle, square)

    setMoves(moves + 1)
    setPreviousMove(square)

    onChange(updated)

    if (isSolved(updated)) {
      requestTransitionOut()
    }
  }

  return (
    (gameState !== "WillTransitionOut" && (
      <View style={styles.container}>
        {gameState === "LoadingImage" && (
          <ActivityIndicator size="large" color="rgba(255,255,255,0.5)" />
        )}
        {gameState !== "LoadingImage" && (
          <View style={styles.centered}>
            <View style={styles.header}>
              <Preview image={image} boardSize={puzzle.size} />
              <Stats moves={moves} time={elapsed} />
            </View>
            <Board
              puzzle={puzzle}
              image={image}
              previousMove={previousMove}
              teardown={gameState === "RequestTransitionOut"}
              onMoveSquare={handlePressSquare}
              onTransitionIn={handleBoardTransitionIn}
              onTransitionOut={handleBoardTransitionOut}
            />
            <Button title="Quit" onPress={handlePressQuit} disabled={false} />
          </View>
        )}
      </View>
    )) ||
    null
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 16,
    alignSelf: "stretch",
  },
})
