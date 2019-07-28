import React from 'react'
import { Textarea } from '@rocketseat/unform'

import Container from '~/components/Container'
import MaInput from '~/components/MaInput'
import MaButton from '~/components/MaButton'

import MaDatePicker from './components/MaDatePicker'
import BannerInput from './components/BannerInput'

import { StyledForm, ButtonWrapper } from './styles'

import history from '~/services/history'
import api from '~/services/api'

export default function NewMeetup() {
  async function handleSubmit(data) {
    const resp = await api.post('meetups', data)

    history.push('/details', { meetUp: resp.data })
  }

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <BannerInput />
        <MaInput name='title' placeholder='Título do Meetup' />
        <Textarea name='description' placeholder='Descrição do Meetup' />
        <MaDatePicker name='dateTime' />
        <MaInput name='location' placeholder='Localização' />
        <ButtonWrapper>
          <MaButton type='submit' title='Salvar meetup' />
        </ButtonWrapper>
      </StyledForm>
    </Container>
  )
}
