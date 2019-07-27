import React from 'react'

import { Wrapper, MeetUp } from './styles'
import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

export default function Dashboard() {
  return (
    <Container>
      <Wrapper>
        <header>
          <h1>Meus meetups</h1>
          <MaButton title='Novo meetup' />
        </header>
        <ol>
          <MeetUp>
            <strong>Meetup de React Native</strong>
            <time>24 de junho, às 20h</time>
          </MeetUp>
          <MeetUp>
            <strong>Meetup de React Native</strong>
            <time>24 de junho, às 20h</time>
          </MeetUp>
          <MeetUp>
            <strong>Meetup de React Native</strong>
            <time>24 de junho, às 20h</time>
          </MeetUp>
          <MeetUp>
            <strong>Meetup de React Native</strong>
            <time>24 de junho, às 20h</time>
          </MeetUp>
        </ol>
      </Wrapper>
    </Container>
  )
}
