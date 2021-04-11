/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useState } from "react"
import { StyleSheet } from "react-native"
import { ImageSource, Puzzle } from "../types"
import { isSolved, movableSquares, move } from "../utils/puzzle"

type Props = {
  puzzle: Puzzle
  image: ImageSource
  onChange: Dispatch<SetStateAction<Puzzle | null>>
  onQuit: (val: unknown) => void
}

export const Game: React.FC<Props> = ({ puzzle, onChange }) => {
  const [moves, setMoves] = useState(0)
  const [previousMove, setPreviousMove] = useState(-100)

  const requestTransitionOut = () => {
    return
  }

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

  return null
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
