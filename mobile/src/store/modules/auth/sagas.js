import { takeLatest, call, put, all } from 'redux-saga/effects'
import { showMessage } from 'react-native-flash-message'

import { signInSuccess, signFailure } from './actions'

import api from '../../../services/api'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))
  } catch (err) {
    showMessage({
      message: err.response.body.message,
      type: 'danger',
    })
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    })
  } catch (err) {
    showMessage({
      message: err.response.body.message,
      type: 'danger',
    })
    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  showMessage({
    message: 'Você foi deslodado do MeetApp',
    type: 'success',
  })
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
