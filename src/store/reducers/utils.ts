import * as a from '../actionTypes'
export const getToggleValue = (action: a.Base, state: boolean): boolean =>
  (action as a.ToggleAction).value !== undefined
    ? (action as a.ToggleAction).value
    : !state
