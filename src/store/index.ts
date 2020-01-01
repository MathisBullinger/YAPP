import { wrap, proxy, transferHandlers } from 'comlink'
import transferIgnoreFunctions from '~/store/transferIgnoreFunctions'
import { Store } from 'redux'

transferHandlers.set('IGNORE_FUNCTIONS', transferIgnoreFunctions)

async function wrapRemote(store) {
  const subscribers = new Set<Function>()

  let latestState = await store.getState()
  store.subscribe(
    proxy(async () => {
      latestState = await store.getState()
      subscribers.forEach(f => f())
    })
  )
  return {
    dispatch: action => store.dispatch(action),
    getState: () => latestState,
    subscribe: listener => {
      subscribers.add(listener)
      return () => subscribers.delete(listener)
    },
    replaceReducer: () => {
      throw new Error('Can’t transfer a function')
    },
  }
}

let store: Store
export async function initStore() {
  const remote = (await wrap(new Worker('./store', { type: 'module' }))) as any
  await remote['ready']
  store = ((await wrapRemote(remote)) as unknown) as Store
}

export { store }
