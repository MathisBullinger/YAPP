import { actions as a } from '../actions'
import State from '../state'
import { getToggleValue } from './utils'

const defaultState: State['appbar'] = {
  visible: true,
  title: '',
  actions: [],
}
export default function appbar(
  state: State['appbar'] = defaultState,
  action: a.Base
): State['appbar'] {
  switch (action.type) {
    case 'TOGGLE_APPBAR':
      return {
        ...state,
        visible: getToggleValue(action, state.visible),
      }
    case 'SET_APPBAR_TITLE':
      return {
        ...state,
        title: (action as a.StringAction).value,
      }
    case 'ADD_APPBAR_ACTION':
      return {
        ...state,
        ...{
          actions: [
            {
              name: (action as a.AppbarAction).name,
              align: (action as a.AppbarAction).align,
            },
          ],
        },
      }
    case 'RESET_APPBAR_ACTIONS':
      return {
        ...state,
        ...{ actions: [] },
      }
    default:
      return state
  }
}
