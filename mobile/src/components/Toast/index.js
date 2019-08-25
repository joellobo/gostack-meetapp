import React, { useEffect } from 'react'
import { Text, Animated } from 'react-native'

import styles from './styles'

export default function Toast({ options }) {
  const animatedValue = new Animated.Value(-70)

  function closeToast() {
    setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: -70,
        duration: 350,
      }).start()
    }, 2000)
  }

  useEffect(() => {
    if (options.show) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 350,
      }).start(closeToast())
    }
  }, [options.text]) // eslint-disable-line

  return (
    <Animated.View
      style={[{
        transform: [{ translateY: animatedValue }],
        backgroundColor: 'green',
      }, styles.toastContainer]}
    >
      <Text
        style={styles.toastText}
      >
        {options.text}
      </Text>
    </Animated.View>
  )
}
