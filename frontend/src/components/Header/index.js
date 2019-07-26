import React from 'react'
import { Link } from 'react-router-dom'

import MaButton from '~/components/MaButton'

import logo from '~/assets/logo.svg'

import { Container, Content, Profile } from './styles'

export default function Header() {
  return (
    <Container>
      <Content>
        <img src={logo} alt='MeetApp logo' />
        <Profile>
          <img
            src='https://api.adorable.io/avatars/50/abott@adorable.png'
            alt='Profile'
          />
          <div>
            <strong>Emilio Heinzmann</strong>
            <Link to='/profile'>Meu perfil</Link>
          </div>
          <MaButton title='Sair' />
        </Profile>
      </Content>
    </Container>
  )
}
