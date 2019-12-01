import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '~/store/'
import { ApolloProvider } from '@apollo/react-hooks'
import apiClient from './api'
import App from './App'

export default () => {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={apiClient}>
        <App />
      </ApolloProvider>
    </Provider>,
    document.getElementById('root')
  )
}
