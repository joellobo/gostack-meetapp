import React, { useEffect, useState, useMemo } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { format, subDays, addDays } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '~/services/api'

import Background from '~/components/Background'
import MeetUpCard from '~/components/MeetUpCard'
import EmptyList from './components/EmptyList'

import { Container, MeetUpsList, PageTitleContainer, PageTitle } from './styles'

export default function Dashboard() {
  const [meetups, setMeetups] = useState([])
  const [date, setDate] = useState(new Date())

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  )

  useEffect(() => {
    async function getMeetups() {
      const response = await api.get('meetups/date', {
        params: {
          date: date.toISOString(),
        },
      })

      setMeetups(response.data)
    }

    getMeetups()
  }, [date])

  function handlePrevDay() {
    setDate(subDays(date, 1))
  }

  function handleNextDay() {
    setDate(addDays(date, 1))
  }

  return (
    <Background>
      <Container>
        <PageTitleContainer>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name='keyboard-arrow-left' size={28} color='#fff' />
          </TouchableOpacity>
          <PageTitle>{dateFormatted}</PageTitle>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name='keyboard-arrow-right' size={28} color='#fff' />
          </TouchableOpacity>
        </PageTitleContainer>
        <MeetUpsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <MeetUpCard meetup={item} />}
          ListEmptyComponent={<EmptyList />}
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
