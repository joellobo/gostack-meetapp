import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '~/services/api'

import Background from '~/components/Background'
import MeetUpCard from '~/components/MeetUpCard'

import { Container, MeetUpsList, PageTitleContainer, PageTitle } from './styles'

export default function Dashboard() {
  const [meetups, setMeetups] = useState([])

  useEffect(() => {
    async function getMeetups() {
      const response = await api.get('meetups/date', {
        params: {
          date: '2019-08-13T23:02:01.139Z',
        },
      })

      setMeetups(response.data)
    }

    getMeetups()
  }, [])

  return (
    <Background>
      <Container>
        <PageTitleContainer>
          <TouchableOpacity>
            <Icon name='keyboard-arrow-left' size={28} color='#fff' />
          </TouchableOpacity>
          <PageTitle>31 de Maio</PageTitle>
          <TouchableOpacity>
            <Icon name='keyboard-arrow-right' size={28} color='#fff' />
          </TouchableOpacity>
        </PageTitleContainer>
        <MeetUpsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <MeetUpCard item={item} />}
        />
      </Container>
    </Background>
  )
}

Dashboard.navigationOptions = {
  title: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name='event' size={20} color={tintColor} />
  ),
}
