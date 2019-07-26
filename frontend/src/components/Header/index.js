import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import MaButton from '~/components/MaButton'

import logo from '~/assets/logo.svg'

import { Container, Content, Profile } from './styles'

export default function Header() {
  const profile = useSelector(state => state.user.profile)

  return (
    <Container>
      <Content>
        <img src={logo} alt='MeetApp logo' />
        <Profile>
          <img
            src={
              profile.avatar
                ? profile.avatar.url
                : 'https://api.adorable.io/avatars/50/abott@adorable.png'
            }
            alt='Profile'
          />
          <div>
            <strong>{profile.name}</strong>
            <Link to='/profile'>Meu perfil</Link>
          </div>
          <MaButton title='Sair' />
        </Profile>
      </Content>
    </Container>
  )
}
