import { isBefore, parseISO } from 'date-fns'

import Subscription from '../models/Subscription'
import Meetup from '../models/Meetup'

class SubscriptionController {
  async store(req, res) {
    const { meetUpId } = req.query

    const meetUp = await Meetup.findByPk(meetUpId)

    if (!meetUp) {
      return res
        .status(404)
        .json({ message: `MeetUp with id ${meetUpId} not found.` })
    }

    if (isBefore(parseISO(meetUp.date_time), new Date())) {
      return res.status(400).json({
        message: "You can't subscribe to past MeetUps.",
      })
    }

    if (meetUp.user_id === req.userId) {
      return res
        .status(401)
        .json({ message: "You can't subscribe to a MeetUp that is yours." })
    }

    const subscriptionExists = await Subscription.findOne({
      where: { user_id: req.userId, meetup_id: meetUpId },
    })

    if (subscriptionExists) {
      return res.status(400).json({
        message:
          "You can't subscribe to MeetUp thath you already is subscribed.",
      })
    }

    const sameHourMeetUps = await Subscription.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id'],
          where: { date_time: meetUp.date_time },
        },
      ],
    })

    if (sameHourMeetUps) {
      return res.status(400).json({
        message:
          'You can not subscribe to MeetUps that are at the same momemt.',
      })
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetUpId,
    })

    return res.json(subscription)
  }
}

export default new SubscriptionController()
