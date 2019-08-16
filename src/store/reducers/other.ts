import { actions as a } from '../actions'
import State from '../state'

export function appbarVisible(
  state: State['appbarVisible'] = true,
  action: a.ToggleAction
): State['appbarVisible'] {
  if (action.type !== 'TOGGLE_APPBAR') return state
  return action.value !== undefined ? action.value : !state
}
