import { Actions } from '../actions'
import persist from '~/store/persist'
import { Reducer } from 'redux'
import defaultState from '../defaultState'

export const getToggleValue = <T extends keyof Actions>(
  action: { type: T; value: boolean },
  state: boolean
): boolean => (action.value !== undefined ? action.value : !state)

export function setup<
  T extends Parameters<typeof persist.DB.get>[0],
  R extends Reducer
>(store: T, dbKeys: string[] | string, reducer: R) {
  return Object.assign(
    async () => {
      let initialState = {
        ...defaultState[store],
        ...Object.fromEntries(
          await Promise.all(
            (Array.isArray(dbKeys) ? dbKeys : [dbKeys]).map(k =>
              persist.DB.get(store, k).then(v => [k, v])
            )
          )
        ),
      }
      if (!Array.isArray(dbKeys)) initialState = initialState[dbKeys]
      return (...[state, action]: Parameters<typeof reducer>) =>
        reducer(state ?? initialState, action)
    },
    { setup: true }
  )
}
