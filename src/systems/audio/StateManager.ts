export default class StateManager {
  private el: HTMLAudioElement

  constructor() {
    this.onSeeking = this.onSeeking.bind(this)
  }

  public connect(el: HTMLAudioElement) {
    this.el = el
    this.el.addEventListener('seeking', this.onSeeking)
  }

  public disconnect() {
    this.el.removeEventListener('seeking', this.onSeeking)
    this.el = null
  }

  private onSeeking() {
    console.log('seeking')
  }
}
