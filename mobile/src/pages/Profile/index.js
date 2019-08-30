import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Animated } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { updateProfileRequest } from '~/store/modules/user/actions'
import { signOut } from '~/store/modules/auth/actions'

import Background from '~/components/Background'

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Divisor,
  LogouButton,
} from './styles'

export default function Profile() {
  const dispatch = useDispatch()

  const emailRef = useRef()
  const oldPasswordRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const user = useSelector(state => state.user.profile)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [screenOpacity, _] = useState(new Animated.Value(0))

  const disapear = Animated.timing(screenOpacity, {
    toValue: 0,
    duration: 0,
  })
  const appear = Animated.timing(screenOpacity, {
    toValue: 1,
    duration: 500,
  })

  useEffect(() => {
    appear.start()
    return () => disapear.start()
  }, []) //eslint-disable-line

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        passwordConfirmation,
      })
    )
  }

  return (
    <Background>
      <Animated.View style={{ flex: 1, opacity: screenOpacity }}>
        <Container>
          <Form>
            <FormInput
              icon='person-outline'
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Nome completo'
              returnKeyType='next'
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />
            <FormInput
              icon='mail-outline'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Digite o seu email'
              ref={emailRef}
              returnKeyType='next'
              onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <Divisor />

            <FormInput
              icon='lock-outline'
              secureTextEntry
              placeholder='Sua senha atual'
              ref={oldPasswordRef}
              returnKeyType='next'
              onSubmitEditing={() => passwordRef.current.focus()}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <FormInput
              icon='lock-outline'
              secureTextEntry
              placeholder='Sua nova senha'
              ref={passwordRef}
              returnKeyType='next'
              oonSubmitEditing={() => passwordConfirmationRef.current.focus()}
              value={password}
              onChangeText={setPassword}
            />
            <FormInput
              icon='lock-outline'
              secureTextEntry
              placeholder='Confimação da nova senha'
              ref={passwordConfirmationRef}
              returnKeyType='send'
              onSubmitEditing={handleSubmit}
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
            <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          </Form>
          <LogouButton onPress={() => dispatch(signOut())}>
            Sair do Meetapp
          </LogouButton>
        </Container>
      </Animated.View>
    </Background>
  )
}

Profile.navigationOptions = {
  title: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name='person' size={20} color={tintColor} />
  ),
}
