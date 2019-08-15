import React, { useEffect, useState, useMemo } from 'react'
import { withNavigationFocus } from 'react-navigation'
import { TouchableOpacity, Alert } from 'react-native'
import { format, subDays, addDays } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '~/services/api'

import Background from '~/components/Background'
import MeetUpCard from '~/components/MeetUpCard'
import EmptyList from './components/EmptyList'

import { Container, MeetUpsList, PageTitleContainer, PageTitle } from './styles'

function Dashboard({ isFocused }) {
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

    if (isFocused) {
      getMeetups()
    }
  }, [date, isFocused])

  function handlePrevDay() {
    setDate(subDays(date, 1))
  }

  function handleNextDay() {
    setDate(addDays(date, 1))
  }

  async function handleSubscription({ id, title }) {
    try {
      await api.post('subscriptions', null, {
        params: { meetUpId: id },
      })

      setMeetups(meetups.filter(meetup => meetup.id !== id))

      Alert.alert(
        'Sucesso!',
        `Você se inscreveu no Meetup ${title} com sucesso`
      )
    } catch (err) {
      Alert.alert('Erro!', err.response.data.message)
    }
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
          renderItem={({ item }) => (
            <MeetUpCard
              meetup={item}
              onMainButtonPress={() => handleSubscription(item)}
              mainButtonText='Realizar inscrição'
            />
          )}
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

export default withNavigationFocus(Dashboard)
