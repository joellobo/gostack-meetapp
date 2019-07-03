import { isBefore, parseISO } from 'date-fns'
import { Op } from 'sequelize'

import Subscription from '../models/Subscription'
import Meetup from '../models/Meetup'
import User from '../models/User'
import File from '../models/File'
import Queue from '../../lib/Queue'
import SubscriptionMail from '../jobs/SubscriptionMail'

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'location', 'date_time'],
          where: {
            date_time: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'url'],
            },
          ],
        },
      ],
      order: [['meetup', 'date_time']],
    })

    return res.json(subscriptions)
  }

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

    const mailData = await Subscription.findByPk(subscription.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title'],
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    })

    const mailOrganizedData = {
      user: mailData.user,
      owner: mailData.meetup.owner,
      meetup: { title: mailData.meetup.title },
      date: mailData.createdAt,
    }

    await Queue.add(SubscriptionMail.key, { subscription: mailOrganizedData })

    return res.json({ subscription })
  }
}

export default new SubscriptionController()
