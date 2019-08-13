import { createStore, combineReducers } from 'redux'
import { setTheme, toggleDarkMode } from './actions'
import * as reducers from './reducers'

const app = combineReducers(reducers)
const store = createStore(app)

const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch(setTheme('dark'))
store.dispatch(setTheme('light'))
store.dispatch(toggleDarkMode())
store.dispatch(toggleDarkMode())
unsubscribe()
