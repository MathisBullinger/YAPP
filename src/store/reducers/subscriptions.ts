import { assemble as a } from '~/store/actions'
import persist from '~/store/persist'

export default Object.assign(
  () =>
    new Promise(resolve => {
      persist.DB.get('subscriptions', 'ids').then(subscriptions =>
        resolve(function(
          state = subscriptions,
          action: a<'SUBSCRIBE'> | a<'UNSUBSCRIBE'>
        ) {
          switch (action.type) {
            case 'SUBSCRIBE':
              return state.includes(action.value)
                ? state
                : [...state, action.value]
            case 'UNSUBSCRIBE':
              return state.filter(id => id !== action.value)
            default:
              return state
          }
        })
      )
    }),
  { setup: true }
)
