import React from 'react'
import { Textarea } from '@rocketseat/unform'
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import PropTypes from 'prop-types'

import Container from '~/components/Container'
import MaInput from '~/components/MaInput'
import MaButton from '~/components/MaButton'

import MaDatePicker from './components/MaDatePicker'
import BannerInput from './components/BannerInput'

import { StyledForm, ButtonWrapper } from './styles'

import history from '~/services/history'
import api from '~/services/api'

export default function NewMeetup({ location }) {
  console.tron.log(location)

  async function handleSubmit(data) {
    let resp = null

    if (location.state) {
      resp = await api.put('meetups', data, {
        params: { meetUpId: location.state.meetUp.id },
      })
    } else {
      resp = await api.post('meetups', data)
    }

    const meetUp = {
      ...resp.data,
      formatedDate: format(
        parseISO(resp.data.date_time),
        "d 'de' MMMM', às' HH:mm",
        {
          locale: pt,
        }
      ),
    }

    history.push('/details', { meetUp })
  }

  return (
    <Container>
      <StyledForm
        initialData={location.state ? location.state.meetUp : null}
        onSubmit={handleSubmit}
      >
        <BannerInput />
        <MaInput name='title' placeholder='Título do Meetup' />
        <Textarea name='description' placeholder='Descrição do Meetup' />
        <MaDatePicker
          name='dateTime'
          selectedDate={location.state && location.state.meetUp.date_time}
        />
        <MaInput name='location' placeholder='Localização' />
        <ButtonWrapper>
          <MaButton type='submit' title='Salvar meetup' />
        </ButtonWrapper>
      </StyledForm>
    </Container>
  )
}

NewMeetup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({ meetUp: PropTypes.object }),
  }).isRequired,
}
