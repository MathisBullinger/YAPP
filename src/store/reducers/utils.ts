export const getToggleValue = (action: any, state: boolean): boolean =>
  action.value !== undefined ? action.value : !state
