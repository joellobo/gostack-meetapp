import React from 'react'
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

export default function MeetUpCard({
  meetup,
  onMainButtonPress,
  mainButtonText,
}) {
  const { banner, title, date_time, location, owner } = meetup

  return (
    <Container>
      <Image source={{ uri: banner.url }} />
      <CardBody>
        <Title>{title}</Title>
        <Content>
          <ContentText>{date_time}</ContentText>
          <ContentText>{location}</ContentText>
          <ContentText>Organizador: {owner.name}</ContentText>
        </Content>
        <Button onPress={onMainButtonPress}>{mainButtonText}</Button>
      </CardBody>
    </Container>
  )
}

MeetUpCard.propTypes = {
  meetup: PropTypes.shape({
    banner: PropTypes.object,
    title: PropTypes.string,
    date_time: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.object,
    id: PropTypes.number,
  }).isRequired,
  onMainButtonPress: PropTypes.func,
  mainButtonText: PropTypes.string.isRequired,
}

MeetUpCard.defaultProps = {
  onMainButtonPress: () => {},
}
