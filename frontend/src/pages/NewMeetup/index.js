import React, { useState } from 'react'
import { Textarea } from '@rocketseat/unform'

import Container from '~/components/Container'
import MaInput from '~/components/MaInput'
import BannerInput from './BannerInput'

import { StyledForm, StyledDatePicker, ButtonWrapper } from './styles'
import MaButton from '~/components/MaButton'

export default function NewMeetup() {
  const [date, setDate] = useState(new Date())

  function handleChange(newDate) {
    setDate(newDate)
  }

  return (
    <Container>
      <StyledForm>
        <BannerInput />
        <MaInput name='title' placeholder='Título do Meetup' />
        <Textarea name='description' placeholder='Descrição do Meetup' />
        <StyledDatePicker
          showTimeSelect
          dateFormat='Pp'
          selected={date}
          onChange={handleChange}
        />
        <MaInput name='location' placeholder='Localização' />
        <ButtonWrapper>
          <MaButton type='submit' title='Salvar meetup' />
        </ButtonWrapper>
      </StyledForm>
    </Container>
  )
}
