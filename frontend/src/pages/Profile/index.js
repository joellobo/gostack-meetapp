import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MaInput from '~/components/MaInput'
import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

import { updateProfileRequest } from '~/store/modules/user/actions'

import { DivisorLine, StyledForm } from './styles'

export default function Profile() {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.user.profile)

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data))
  }

  return (
    <Container>
      <StyledForm initialData={profile} onSubmit={handleSubmit}>
        <MaInput name='name' placeholder='Insira seu nome' />
        <MaInput name='email' placeholder='Insira seu email' type='email' />
        <DivisorLine />
        <MaInput
          type='password'
          name='oldPassword'
          placeholder='Sua senha atual'
        />
        <MaInput type='password' name='password' placeholder='Nova senha' />
        <MaInput
          type='password'
          name='passwordConfirmation'
          placeholder='Confirmação de senha'
        />
        <MaButton type='submit' title='Salvar perfil' />
      </StyledForm>
    </Container>
  )
}
