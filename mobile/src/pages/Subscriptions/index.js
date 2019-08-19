import React, { useState, useEffect } from 'react'
import { withNavigationFocus } from 'react-navigation'
import { format, parseISO } from 'date-fns'
import { Alert } from 'react-native'
import pt from 'date-fns/locale/pt'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'
import MeetUpCard from '~/components/MeetUpCard'
import EmptySubscriptionList from './components/EmptySubscriptionsList'

import { Container, MeetUpsList } from './styles'

import api from '~/services/api'

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([])

  useEffect(() => {
    async function getSubscribedMeetups() {
      const response = await api.get('subscriptions')

      const subscribedMeetups = response.data.map(sub => ({
        ...sub.meetup,
        formattedDate: format(
          parseISO(sub.meetup.date_time),
          "d 'de' MMMM 'de' yyyy 'às' HH:hh",
          { locale: pt }
        ),
      }))

      setMeetups(subscribedMeetups)
    }

    if (isFocused) {
      getSubscribedMeetups()
    }
  }, [isFocused])

  async function handleCancelClick({ id, title }) {
    try {
      await api.delete('subscriptions', {
        params: { meetUpId: id },
      })

      setMeetups(meetups.filter(meetup => meetup.id !== id))

      Alert.alert('Sucesso!', `Sua inscrição no meetup ${title} foi cancelada.`)
    } catch (err) {
      Alert.alert('Erro!', err.response.data.message)
    }
  }

  return (
    <Background>
      <Container>
        <MeetUpsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetUpCard
              meetup={item}
              mainButtonText='Cancelar inscrição'
              onMainButtonPress={() => handleCancelClick(item)}
            />
          )}
          ListEmptyComponent={<EmptySubscriptionList />}
        />
      </Container>
    </Background>
  )
}

Subscriptions.navigationOptions = {
  title: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name='playlist-add-check' size={30} color={tintColor} />
  ),
}

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
}

export default withNavigationFocus(Subscriptions)
