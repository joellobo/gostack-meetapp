import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import authMiddleware from './app/middlewares/global/auth'
import validateSessionStoreFields from './app/middlewares/session/validateStoreFields'
import validateUserStoreFields from './app/middlewares/user/validateStoreFields'
import validateUserUpdateFields from './app/middlewares/user/validateUpdateFields'

const routes = new Router()

routes.post('/users', validateUserStoreFields, UserController.store)
routes.put(
  '/users',
  authMiddleware,
  validateUserUpdateFields,
  UserController.update
)

routes.post('/sessions', validateSessionStoreFields, SessionController.store)

export default routes
