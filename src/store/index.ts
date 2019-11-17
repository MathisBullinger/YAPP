import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSaga from 'redux-saga'
import * as reducers from './reducers'
import saga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

const sagaMiddleware = createSaga()

const app = combineReducers(reducers)
export default createStore(
  app,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(saga)
