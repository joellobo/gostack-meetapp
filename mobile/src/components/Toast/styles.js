import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  toastText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastContainer: {
    height: 70,
    position: 'absolute',
    opacity: 0.9,
    left: 0,
    top: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 10,
  },
})

export default styles
