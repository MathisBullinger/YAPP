import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

const app = combineReducers(reducers)
export default createStore(app, applyMiddleware(thunk))
