import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

import Button from '~/components/Button'

import {
  Container,
  Image,
  Title,
  Content,
  ContentText,
  CardBody,
} from './styles'
import api from '~/services/api'

export default function MeetUpCard({ meetup }) {
  const { banner, title, dateTime, location, owner, id } = meetup

  async function handleSubscription() {
    try {
      await api.post('subscriptions', null, {
        params: { meetUpId: id },
      })

      Alert.alert(
        'Sucesso!',
        `Você se inscreveu no Meetup ${title} com sucesso`
      )
    } catch (err) {
      Alert.alert('Erro!', err.response.data.message)
    }
  }

  return (
    <Container>
      <Image source={{ uri: banner.url }} />
      <CardBody>
        <Title>{title}</Title>
        <Content>
          <ContentText>{dateTime}</ContentText>
          <ContentText>{location}</ContentText>
          <ContentText>Organizador: {owner.name}</ContentText>
        </Content>
        <Button onPress={handleSubscription}>Realizar inscrição</Button>
      </CardBody>
    </Container>
  )
}

MeetUpCard.propTypes = {
  meetup: PropTypes.shape({
    banner: PropTypes.object,
    title: PropTypes.string,
    dateTime: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.object,
    id: PropTypes.number,
  }).isRequired,
}
