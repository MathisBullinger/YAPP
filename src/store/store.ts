import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSaga from 'redux-saga'
import { expose, transferHandlers } from 'comlink'
import transferIgnoreFunctions from '~/store/transferIgnoreFunctions'
import * as reducers from './reducers'
import saga from './sagas'
import persist from './persist'

transferHandlers.set('IGNORE_FUNCTIONS', transferIgnoreFunctions)

const sagaMiddleware = createSaga()

const store = {
  ready: new Promise(resolve => {
    performance.mark('redux')
    persist.initDB().then(() => {
      Promise.all(
        (Object.values(reducers) as Function[]).map(red =>
          red['setup']
            ? (red as () => Promise<Function>)()
            : Promise.resolve(red)
        ) as Promise<() => {}>[]
      ).then(reds => {
        performance.measure('reducers')
        console.log(
          `redux setup in ${
            performance.getEntriesByName('reducers').shift().duration
          } ms`
        )
        const names = Object.keys(reducers)
        const app = combineReducers(
          Object.fromEntries(reds.map((red, i) => [names[i], red]))
        )
        Object.assign(
          store,
          createStore(app, compose(applyMiddleware(sagaMiddleware)))
        )
        sagaMiddleware.run(saga)

        resolve()
      })
    })
  }),
}

expose(store)
