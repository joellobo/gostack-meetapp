import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'

import { updateProfileSuccess, updateProfileFailure } from './actions'
import { show } from '../toast/actions'

import api from '~/services/api'

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data

    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    )

    const response = yield call(api.put, 'users', profile)

    yield put(updateProfileSuccess(response.data))
    yield put(
      show({
        text: 'Perfil atualizado com sucesso',
        type:'SUCCESS',
        show: true
      },
        'Profile'
      )
    )
  } catch (err) {
    Alert.alert('Erro', 'Erro ao atualizar perfil, verifique seus dados.')
    yield put(updateProfileFailure())
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)])
