import { takeLatest, call, put, all } from 'redux-saga/effects'
import { showMessage, hideMessage } from 'react-native-flash-message'

import { updateProfileSuccess, updateProfileFailure } from './actions'

import api from '~/services/api'

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data

    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    )

    const response = yield call(api.put, 'users', profile)

    showMessage({ message: 'Simple message', type: 'info' })
    yield put(updateProfileSuccess(response.data))
  } catch (err) {
    yield put(
      show(
        {
          text: 'Opss parece que houve um erro, verifique os campos.',
          type: 'ERROR',
          show: true,
        },
        'Profile'
      )
    )
    yield put(updateProfileFailure())
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)])
