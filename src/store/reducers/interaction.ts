import * as a from '../actionTypes'
import defaultState from '../defaultState'

export default function interaction(
  state = defaultState['interaction'],
  action: a.Base
) {
  switch (action.type) {
    case 'SET_MOUSE_POS':
      return {
        ...state,
        mousePos: {
          x: (action as a.NumbersAction).values[0],
          y: (action as a.NumbersAction).values[1],
        },
      }
    case 'SET_INTERACTION_METHOD':
      return {
        ...state,
        method: (action as a.StringAction).value,
      }
    default:
      return state
  }
}
