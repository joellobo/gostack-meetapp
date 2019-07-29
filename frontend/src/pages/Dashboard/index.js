import React, { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'
import history from '~/services/history'

import { Wrapper, MeetUp } from './styles'
import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

export default function Dashboard() {
  const [meetUps, setMeetUps] = useState([])

  useEffect(() => {
    async function loadMeetUps() {
      const response = await api.get('meetups')

      const data = response.data.map(meetUp => ({
        ...meetUp,
        formatedDate: format(
          parseISO(meetUp.date_time),
          "d 'de' MMMM', às' HH:mm",
          {
            locale: pt,
          }
        ),
      }))

      setMeetUps(data)
    }

    loadMeetUps()
  }, [])

  function handleMeetUpClick(meetUp) {
    history.push('/details', { meetUp })
  }

  function handleNewMeetUpClick() {
    history.push('/register-meetup')
  }

  return (
    <Container>
      <Wrapper>
        <header>
          <h1>Meus meetups</h1>
          <MaButton title='Novo meetup' onClick={handleNewMeetUpClick} />
        </header>
        <ol>
          {meetUps.map(meetUp => (
            <MeetUp key={meetUp.id} onClick={() => handleMeetUpClick(meetUp)}>
              <strong>{meetUp.title}</strong>
              <div>
                <time>{meetUp.formatedDate}</time>
                <MdNavigateNext color='#fff' size={30} />
              </div>
            </MeetUp>
          ))}
        </ol>
      </Wrapper>
    </Container>
  )
}
