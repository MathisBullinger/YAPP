import React from 'react'
import { assert } from '~/utils/debug'

export default abstract class Component extends React.Component {
  protected props: {
    children: any
  }
  protected state: {
    variant?: string
  }
  public variant: string

  constructor(props: object, variants?: string[], defaultVariant?: string) {
    super(props)
    if (!variants) return
    assert(
      () => variants.every(v => /[a-z]/.test(v[0])),
      'variants must be lower case'
    )
    const variantProps = Object.keys(props).filter(
      p => variants.includes(p) && props[p]
    )
    assert(
      () => variantProps.length > 0 || variants.includes(defaultVariant),
      'no variant specified'
    )
    assert(() => variantProps.length < 2, 'multiple variants specified')
    if (variantProps.length > 0) this.state = { variant: variantProps[0] }
    else this.state = { variant: defaultVariant }
  }

  abstract render()
}
