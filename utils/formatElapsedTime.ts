const formatNumber = (number: number, pad = false) => {
  const numberString = number.toString()

  if (!pad) return numberString

  return numberString.length < 2 ? `0${numberString}` : numberString
}

export function formatElapsedTime(elapsed: number) {
  const seconds = elapsed % 60
  const minutes = Math.floor((elapsed / 60) % 60)
  const hours = Math.floor(elapsed / 60 / 60)

  const parts = [
    hours > 0 && formatNumber(hours),
    (hours > 0 || minutes > 0) && formatNumber(minutes, hours > 0),
    formatNumber(seconds, hours > 0 || minutes > 0),
  ]

  return parts.filter((x) => x !== false).join(":")
}
