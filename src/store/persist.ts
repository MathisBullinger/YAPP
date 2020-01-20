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
  player: {
    key: string
    value: number
  }
}

const persist: {
  DB: IDBPDatabase<YappDB>
  initDB: () => Promise<typeof persist['DB']>
} = {
  DB: null,
  initDB: () =>
    openDB<YappDB>('yapp', 2, {
      async upgrade(db, oldVersion, newVersion) {
        console.log(`upgrading db from ${oldVersion} to ${newVersion}`)
        const ops: Promise<any>[] = []

        if (oldVersion === 0) {
          const subscriptions = db.createObjectStore('subscriptions')
          ops.push(subscriptions.put([], 'ids'))

          const theme = db.createObjectStore('theme')
          ops.push(
            ...Object.entries(defaultState.theme).map(([k, v]) =>
              theme.put(v, k)
            )
          )
        }

        if (oldVersion < 2) {
          const player = db.createObjectStore('player')
          ops.push(player.put(defaultState.player.volume, 'volume'))
        }

        await Promise.all(ops)
      },
    }).then(db => ((persist.DB = db), db)),
}

export default persist
