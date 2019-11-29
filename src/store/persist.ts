import { openDB, DBSchema, IDBPDatabase } from 'idb'

export interface YappDB extends DBSchema {
  subscriptions: {
    key: string
    value: string[]
  }
}

const persist: {
  DB: IDBPDatabase<YappDB>
  initDB: () => Promise<typeof persist['DB']>
} = {
  DB: null,
  initDB: () =>
    openDB<YappDB>('yapp', 1, {
      upgrade(db) {
        db.createObjectStore('subscriptions').put([], 'ids')
      },
    }).then(db => ((persist.DB = db), db)),
}

export default persist
