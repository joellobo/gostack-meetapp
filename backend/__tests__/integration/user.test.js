import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'

describe('User store', () => {
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

  it('Should be not possible register user with email without @, must return status 400', async () => {
    const user = await factory.attrs('User', {
      email: 'thisisnotavalidemail.com',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user with a password shorter than 8 characteres, must return status 400', async () => {
    const user = await factory.attrs('User', {
      password: '1234567',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user without name, must return status 400', async () => {
    const user = await factory.attrs('User', {
      email: '',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user without email, must return status 400', async () => {
    const user = await factory.attrs('User', {
      email: '',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })

  it('Should be not possible register a user without email, must return status 400', async () => {
    const user = await factory.attrs('User', {
      password: '',
    })

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })
})

describe('User update', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should be possible update the name of a existent user', async () => {
    const user = await factory.attrs('User')

    const {
      request: { _data: userData },
    } = await request(app)
      .post('/users')
      .send(user)

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: userData.email, password: userData.password })

    const response = await request(app)
      .put('/users')
      .send({ name: 'New User Name' })
      .set({ Authorization: `Bearer ${sessionData.token}` })

    expect(response.body.name).toBe('New User Name')
  })
})
