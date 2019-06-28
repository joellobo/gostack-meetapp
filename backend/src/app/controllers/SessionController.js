import * as Yup from 'yup'
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

import User from '../models/User'

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation failed, there are missing parameters.' })
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      res.status(401).json({ message: `User with email ${email} not found.` })
    }

    const passwordMatch = await user.checkPassword(password)
    if (!passwordMatch) {
      res.status(401).json({ message: `Password does not match.` })
    }

    const { id, name } = user
    const { expiresIn, secret } = authConfig

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    })
  }
}

export default new SessionController()