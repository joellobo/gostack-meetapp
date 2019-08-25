import React, { useEffect } from 'react'
import { Text, Animated } from 'react-native'

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
      style={{
        transform: [{ translateY: animatedValue }],
        height: 70,
        backgroundColor: 'green',
        position: 'absolute',
        opacity: 0.9,
        left: 0,
        top: 0,
        right: 0,
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <Text
        style={{
          marginLeft: 10,
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {options.text}
      </Text>
    </Animated.View>
  )
}
