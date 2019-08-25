import produce from 'immer'

const INITIAL_STATE = {
  route: 'Dashboard',
  options: {
    text: null,
    type: null,
    show: false,
  },
}

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@toast/SHOW': {
        const { text, type, show } = action.payload.options

        draft.options.text = text
        draft.options.type = type
        draft.options.show = show
        draft.route = action.payload.route
        break
      }
      default:
        return state
    }
  })
}
