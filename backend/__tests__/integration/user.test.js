import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should encrypt user password when new user is created', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    })

    const compareHash = await bcrypt.compare('12345678', user.password_hash)

    expect(compareHash).toBe(true)
  })

  it('Should register a new user', async () => {
    const user = await factory.attrs('User')

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.body).toHaveProperty('id')
  })

  it('Should be not possible register duplicated emails, must return status 400', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })
})
