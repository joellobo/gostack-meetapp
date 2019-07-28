import React from 'react'
import PropTypes from 'prop-types'

import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

import history from '~/services/history'

import { Wrapper, Content, Header, Footer } from './styles'

export default function MeetupDetails({ location }) {
  const currentMeetUp = location.state.meetUp

  const {
    title,
    description,
    location: place,
    formatedDate,
    banner,
  } = currentMeetUp

  function handleEditMeetUpClick() {
    history.push('/register-meetup', { meetUp: currentMeetUp })
  }

  return (
    <Container>
      <Wrapper>
        <Header>
          <h1>{title}</h1>
          <div>
            <MaButton
              onClick={handleEditMeetUpClick}
              color='#4DBAF9'
              title='Editar'
            />
            <MaButton title='Cancelar' />
          </div>
        </Header>
        <Content>
          <img src={banner.url} alt='Banner do meetup detalhado' />
          <p>{description}</p>
        </Content>
        <Footer>
          <time>{formatedDate}</time>
          <p>{place}</p>
        </Footer>
      </Wrapper>
    </Container>
  )
}

MeetupDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetUp: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        formatedDate: PropTypes.string,
        banner: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
}
