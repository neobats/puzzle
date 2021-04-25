/**
 * @example
 * const board = {
 *   size: 3,
 *   empty: 8,
 *   board: [7, 3, 1, 6, 8, 2, 0, 4, 5]
 * }
 */

export interface Puzzle {
  size: number
  board: number[]
  empty: number
}
