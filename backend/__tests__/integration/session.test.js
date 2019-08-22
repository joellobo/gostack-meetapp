import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'

describe('Session store', () => {
  beforeEach(async () => {
    await truncate()
  })
})
