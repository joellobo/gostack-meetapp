import { takeLatest, call, put, all } from 'redux-saga/effects'
import { showMessage } from 'react-native-flash-message'

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

    showMessage({ message: 'Prerfil atualizado com sucesso', type: 'success' })
    yield put(updateProfileSuccess(response.data))
  } catch (err) {
    showMessage({
      message: 'Erro, verifique os dados preenchidos e tente novamente',
      type: 'danger',
    })
    yield put(updateProfileFailure())
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)])
