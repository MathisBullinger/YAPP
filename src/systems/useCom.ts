import { System } from '.'
import store from '~/store'
import { toggleUsecomShow } from '~/store/actions'
import State from '~/store/state'

export default class UseCom implements System {
  public readonly name = 'usecom'

  private static readonly publicActions = ['info', 'request', 'response']
  private msgQueue: Message[] = []
  private current: Message

  public msg(action: string, ...payload: any) {
    if (!UseCom.publicActions.includes(action)) return
    return this[action](...payload)
  }

  private info(text: string) {
    this.pushMsg({ text, type: 'info' })
  }

  private request(text: string) {
    return new Promise(resolve => {
      this.pushMsg({
        text,
        type: 'request',
        callback(res) {
          resolve(res === 'allow')
        },
      })
    })
  }

  private response(text: 'allow' | 'deny') {
    if (this.current && this.current.callback) this.current.callback(text)
    this.hideMessage()
    if (this.msgQueue.length) this.showMessage(this.msgQueue.shift())
  }

  private showMessage(msg: Message) {
    this.current = msg
    store.dispatch({
      type: 'SET_USECOM_TEXT',
      value: msg.text,
    })
    store.dispatch({
      type: 'SET_USECOM_TYPE',
      value: msg.type,
    })
    store.dispatch(toggleUsecomShow(true))
  }

  private hideMessage() {
    store.dispatch(toggleUsecomShow(false))
    this.current = null
  }

  private pushMsg(msg: Message) {
    this.msgQueue.push(msg)
    if (!store.getState().useCom.show) this.showMessage(this.msgQueue.shift())
  }
}

interface Message {
  text: string
  type: State['useCom']['type']
  callback?(response: 'allow' | 'deny'): void
}
