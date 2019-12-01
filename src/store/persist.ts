import { openDB, DBSchema, IDBPDatabase } from 'idb'
import defaultState from '~/store/defaultState'

export interface YappDB extends DBSchema {
  subscriptions: {
    key: string
    value: string[]
  }
  theme: {
    key: string
    value: string | boolean
  }
}

const persist: {
  DB: IDBPDatabase<YappDB>
  initDB: () => Promise<typeof persist['DB']>
} = {
  DB: null,
  initDB: () =>
    openDB<YappDB>('yapp', 1, {
      async upgrade(db) {
        const subscriptions = db.createObjectStore('subscriptions')
        const theme = db.createObjectStore('theme')
        await Promise.all([
          subscriptions.put([], 'ids'),
          ...Object.entries(defaultState.theme).map(([k, v]) =>
            theme.put(v, k)
          ),
        ])
      },
    }).then(db => ((persist.DB = db), db)),
}

export default persist
