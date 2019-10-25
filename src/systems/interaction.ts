import { System } from '.'
import throttle from 'lodash/throttle'
import store from '~/store'
import { setMousePos } from '~/store/actions'

export default class Interaction implements System {
  public readonly name = 'interaction'
  private static readonly publicActions = [
    'startListenMousePos',
    'stopListenMousePos',
  ]

  public msg(action: string, ...payload: any) {
    if (!Interaction.publicActions.includes(action)) return
    this[action](...payload)
  }

  startListenMousePos() {
    window.addEventListener('mousemove', this.onMouseMove)
  }

  stopListenMousePos() {
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = throttle((e: MouseEvent) => {
    store.dispatch(setMousePos(e.clientX, e.clientY))
  }, 1000 / 30)
}
