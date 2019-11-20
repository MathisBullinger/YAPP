import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSaga from 'redux-saga'
import * as reducers from './reducers'
import saga from './sagas'

import { expose, transferHandlers } from 'comlink'
import transferIgnoreFunctions from '~/store/transferIgnoreFunctions'

transferHandlers.set('IGNORE_FUNCTIONS', transferIgnoreFunctions)

const sagaMiddleware = createSaga()

const app = combineReducers(reducers)
const store = createStore(app, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(saga)

expose(store)
