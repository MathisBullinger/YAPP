import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose as composeWithoutDevTools,
} from 'redux'
import createSaga from 'redux-saga'
import * as reducers from './reducers'
import saga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

const sagaMiddleware = createSaga()

const compose: Function =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools
    : composeWithoutDevTools

const app = combineReducers(reducers)
export default createStore(app, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(saga)
