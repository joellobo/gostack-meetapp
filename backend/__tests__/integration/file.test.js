import request from 'supertest'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'

describe('Session store', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should be possible upload a new file', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const response = await request(app)
      .post('/files')
      .attach('file', `${__dirname}/images/testimage.jpeg`)
      .set({ Authorization: `Bearer ${sessionData.token}` })

    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('path')
  })
})
