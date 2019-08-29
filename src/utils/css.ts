abstract class CSSUnit {
  public readonly value: number

  constructor(value: number) {
    this.value = value
  }

  abstract toPx(): Px
}

export class Px extends CSSUnit {
  constructor(value: number) {
    super(value)
  }

  toPx() {
    return new Px(this.value)
  }
}

export class Rem extends CSSUnit {
  constructor(value: number) {
    super(value)
  }

  toPx() {
    return new Px(this.value * remInPx())
  }
}

function remInPx() {
  try {
    return (
      document.body
        // @ts-ignore
        .computedStyleMap()
        .get('font-size')
        .to('px').value
    )
  } catch (e) {
    return parseInt(getComputedStyle(document.body).fontSize, 10)
  }
}
