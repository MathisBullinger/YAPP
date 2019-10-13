import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import '~/store/persist'
import { ApolloProvider } from '@apollo/react-hooks'
import apiClient from './api'
import App from './App'
import UseCom from '~/systems/useCom'
import { register } from '~/systems'

register(new UseCom())

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apiClient}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
