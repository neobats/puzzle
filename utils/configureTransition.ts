import { LayoutAnimation, Platform } from "react-native"

export function configureTransition(
  onConfigured = () => {
    return
  },
) {
  const animation = LayoutAnimation.create(
    750,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity,
  )

  const promise = new Promise((resolve) => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === "android") {
      LayoutAnimation.configureNext(animation)
      setTimeout(resolve, 750)
    } else {
      LayoutAnimation.configureNext(animation, resolve as () => void)
    }
  })

  onConfigured()
  return promise
}
