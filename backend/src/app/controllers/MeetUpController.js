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
}

export default new MeetUpController()
