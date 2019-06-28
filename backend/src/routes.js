import { Router } from 'express'

const routes = new Router()

routes.post('/users', (req, res) => res.json({ ok: true }))

export default routes
