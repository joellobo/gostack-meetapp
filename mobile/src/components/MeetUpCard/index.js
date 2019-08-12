import React from 'react'

import Button from '~/components/Button'

import {
  Container,
  Image,
  Title,
  Content,
  ContentText,
  CardBody,
} from './styles'

export default function MeetUpCard({ item }) {
  return (
    <Container>
      <Image source={{ uri: item.banner.url }} />
      <CardBody>
        <Title>{item.title}</Title>
        <Content>
          <ContentText>{item.date_time}</ContentText>
          <ContentText>{item.location}</ContentText>
          <ContentText>Organizador: {item.owner.name}</ContentText>
        </Content>
        <Button>Realizar inscrição</Button>
      </CardBody>
    </Container>
  )
}
