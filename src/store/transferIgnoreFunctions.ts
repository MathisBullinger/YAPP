import { TransferHandler } from 'comlink'

export default {
  canHandle: v => v instanceof Function,
  serialize: () => [0, []],
  deserialize: () => 0,
} as TransferHandler
