/**
 * If `number` is less than `min` or greater than `max`, return `min` or `max`
 * respectively. Otherwise, return `number`.
 */
export function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}
