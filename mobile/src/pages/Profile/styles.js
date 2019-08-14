import styled from 'styled-components/native'

import Input from '~/components/Input'
import Button from '~/components/Button'

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
  padding: 0 20px;
`

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`

export const Divisor = styled.View`
  height: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
  width: 100%;
`
