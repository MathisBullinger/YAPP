import { Actions } from '../actions'

export const getToggleValue = <T extends keyof Actions>(
  action: { type: T; value: boolean },
  state: boolean
): boolean => (action.value !== undefined ? action.value : !state)
