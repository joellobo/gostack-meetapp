import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns'
import { Op } from 'sequelize'

import Meetup from '../models/Meetup'
import File from '../models/File'
import User from '../models/User'

class MeetupController {
  async index(req, res) {
    const meetUps = await Meetup.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'title', 'description', 'location', 'date_time'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    })

    return res.json(meetUps)
  }

  async listByDate(req, res) {
    const { date, page = 1 } = req.query

    const searchedDate = parseISO(date)

    const meetUps = await Meetup.findAll({
      where: {
        date_time: {
          [Op.between]: [startOfDay(searchedDate), endOfDay(searchedDate)],
        },
      },
      offset: (page - 1) * 10,
      limit: 10,
      order: ['date_time'],
      attributes: ['id', 'title', 'description', 'location', 'date_time'],
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    })

    return res.json(meetUps)
  }

  async store(req, res) {
    const { title, description, location, dateTime, bannerId } = req.body

    const isMeetUpBeforeNow = isBefore(parseISO(dateTime), new Date())

    if (isMeetUpBeforeNow) {
      return res.status(400).json({
        message: "You can't register MeetUps with dates befores now.",
      })
    }

    const newMeetUp = await Meetup.create({
      title,
      description,
      location,
      date_time: dateTime,
      banner_id: bannerId,
      user_id: req.userId,
    })

    return res.json(newMeetUp)
  }

  async update(req, res) {
    const meetUp = await Meetup.findByPk(req.query.meetUpId)

    if (meetUp.user_id !== req.userId) {
      return res.status(401).json({
        message: 'You are not authorized to update this MeetUp.',
      })
    }

    if (isBefore(parseISO(meetUp.date_time), new Date())) {
      return res.status(400).json({
        message: "You can't update past MeetUps.",
      })
    }

    const { dateTime } = req.body

    const isMeetUpBeforeNow =
      dateTime && isBefore(parseISO(dateTime), new Date())

    if (isMeetUpBeforeNow) {
      return res.status(400).json({
        message: "You can't register MeetUps with dates befores now.",
      })
    }

    const updatedMeetUp = await meetUp.update(req.body)

    return res.json(updatedMeetUp)
  }

  async delete(req, res) {
    const meetUpId = Number(req.params.id)

    const meetUp = await Meetup.findByPk(meetUpId)

    if (!meetUp) {
      return res
        .status(404)
        .json({ message: `MeetUp with id ${meetUpId} was not found.` })
    }

    if (meetUp.user_id !== req.userId) {
      return res.status(401).json({ message: "You can't delete this MeetUp." })
    }

    Meetup.destroy({ where: { id: meetUpId } })

    return res.json({
      message: `MeetUp with id ${meetUpId} was deleted.`,
    })
  }
}

export default new MeetupController()
