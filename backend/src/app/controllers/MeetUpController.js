import { isBefore, parseISO } from 'date-fns'

import MeetUp from '../models/MeetUp'

class MeetUpController {
  async store(req, res) {
    const { title, description, location, dateTime, bannerId } = req.body

    const isMeetUpBeforeNow = isBefore(parseISO(dateTime), new Date())

    if (isMeetUpBeforeNow) {
      return res.status(400).json({
        message: "You can't register MeetUps with dates befores now.",
      })
    }

    const newMeetUp = await MeetUp.create({
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
    const meetUp = await MeetUp.findByPk(req.query.meetUpId)

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
}

export default new MeetUpController()
