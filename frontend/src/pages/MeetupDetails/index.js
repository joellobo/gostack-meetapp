import React from 'react'

import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

import { Wrapper, Content, Header, Footer } from './styles'

export default function MeetupDetails() {
  return (
    <Container>
      <Wrapper>
        <Header>
          <h1>Meetup de React Native</h1>
          <div>
            <MaButton title='Editar' />
            <MaButton title='Cancelar' />
          </div>
        </Header>
        <Content>
          <img
            src='https://camunda.com/img/events/meetup-example.jpg'
            alt='Banner do meetup corrente'
          />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            magnam maxime fugiat facilis mollitia iure molestias magni?
            Consectetur quasi nostrum quis recusandae possimus doloribus
            perferendis quibusdam suscipit, fugit, magni ad!
          </p>
        </Content>
        <Footer>
          <time>24 de Junho, às 20h</time>
          <p>Rua Guilherme Gembala, 260</p>
        </Footer>
      </Wrapper>
    </Container>
  )
}
