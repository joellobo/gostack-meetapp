import { Router } from 'express'
import multer from 'multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'

import validateSessionStoreFields from './app/middlewares/session/validateStoreFields'
import validateUserStoreFields from './app/middlewares/user/validateStoreFields'
import validateUserUpdateFields from './app/middlewares/user/validateUpdateFields'
import validateMeetUpStoreFields from './app/middlewares/meetup/validateStoreFields'
import authMiddleware from './app/middlewares/global/auth'

import multerConfig from './config/multer'
import MeetUpController from './app/controllers/MeetUpController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', validateUserStoreFields, UserController.store)
routes.put(
  '/users',
  authMiddleware,
  validateUserUpdateFields,
  UserController.update
)

routes.post(
  '/meetups',
  authMiddleware,
  validateMeetUpStoreFields,
  MeetUpController.store
)

routes.post('/sessions', validateSessionStoreFields, SessionController.store)

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
)

export default routes
