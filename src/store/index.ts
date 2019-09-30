import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSaga from 'redux-saga'
import * as reducers from './reducers'
import saga from './sagas'

const sagaMiddleware = createSaga()

const app = combineReducers(reducers)
export default createStore(app, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)
