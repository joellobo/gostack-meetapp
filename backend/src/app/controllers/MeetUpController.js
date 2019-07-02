import { isBefore, parseISO } from 'date-fns'

import Meetup from '../models/Meetup'

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } })

    return res.json(meetups)
  }

  async store(req, res) {
    const { title, description, location, dateTime, bannerId } = req.body

    const isMeetupBeforeNow = isBefore(parseISO(dateTime), new Date())

    if (isMeetupBeforeNow) {
      return res.status(400).json({
        message: "You can't register MeetUps with dates befores now.",
      })
    }

    const newMeetup = await Meetup.create({
      title,
      description,
      location,
      date_time: dateTime,
      banner_id: bannerId,
      user_id: req.userId,
    })

    return res.json(newMeetup)
  }

  async update(req, res) {
    const meetup = await Meetup.findByPk(req.query.meetUpId)

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        message: 'You are not authorized to update this MeetUp.',
      })
    }

    if (isBefore(parseISO(meetup.date_time), new Date())) {
      return res.status(400).json({
        message: "You can't update past MeetUps.",
      })
    }

    const { dateTime } = req.body

    const isMeetupBeforeNow =
      dateTime && isBefore(parseISO(dateTime), new Date())

    if (isMeetupBeforeNow) {
      return res.status(400).json({
        message: "You can't register MeetUps with dates befores now.",
      })
    }

    const updatedMeetup = await meetup.update(req.body)

    return res.json(updatedMeetup)
  }

  async delete(req, res) {
    const meetUpId = Number(req.params.id)

    const meetup = await Meetup.findByPk(meetUpId)

    if (!meetup) {
      return res
        .status(404)
        .json({ message: `MeetUp with id ${meetUpId} was not found.` })
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ message: "You can't delete this MeetUp." })
    }

    Meetup.destroy({ where: { id: meetUpId } })

    return res.json({
      message: `MeetUp with id ${meetUpId} was deleted.`,
    })
  }
}

export default new MeetupController()
