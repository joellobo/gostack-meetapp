import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.8,
})`
  height: 46px;
  background: #f94d5a;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`
