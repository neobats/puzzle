export type PuzzleState =
  | "WillTransitionIn"
  | "DidTransitionOut"
  | "DidTransitionIn"

export type BaseGameState = "WillTransitionIn" | "WillTransitionOut"

export type GameStartState = BaseGameState | "Launching"

export type GameState = BaseGameState | "LoadingImage" | "RequestTransitionOut"
