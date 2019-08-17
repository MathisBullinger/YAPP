import { actions as a } from '../actions'
export const getToggleValue = (action: a.Base, state: boolean): boolean =>
  (action as a.ToggleAction).value !== undefined
    ? (action as a.ToggleAction).value
    : !state
