import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

import File from '../models/File'
import User from '../models/User'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    })

    if (!user) {
      res.status(401).json({ message: `User with email ${email} not found.` })
    }

    const passwordMatch = await user.checkPassword(password)
    if (!passwordMatch) {
      res.status(401).json({ message: `Password does not match.` })
    }

    const { id, name, avatar } = user
    const { expiresIn, secret } = authConfig

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    })
  }
}

export default new SessionController()
