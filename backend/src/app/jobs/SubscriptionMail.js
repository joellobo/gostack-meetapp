import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Mail from '../../lib/Mail'

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail'
  }

  async handle({ data }) {
    const { subscription } = data
    const { owner, user, date } = subscription

    await Mail.sendMail({
      to: `${owner.name} <${owner.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        owner: owner.name,
        user: user.name,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    })
  }
}

export default new SubscriptionMail()
