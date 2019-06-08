import { assert } from './debug'

export default class Component {
  constructor(def) {
    this.dataFuncs = []

    // copy properties
    for (let prop in def) {
      if (prop === 'data') {
        assert(
          () => typeof def[prop] === 'function',
          `component data must be a function (${def.name})`
        )
        this._addData(def[prop])
        continue
      }
      this[prop] = def[prop]
    }

    assert(() => this.name, 'component must have name')

    if (this.types) {
      // add type properties
      if (!this.props) this.props = {}
      this.props = Object.assign(
        this.props,
        Object.fromEntries(
          this.types.filter(t => t !== 'default').map(t => [t, Boolean])
        )
      )

      // type computed property
      if (!this.computed) this.computed = {}
      this.computed['type'] = function() {
        if (!this.types) return
        if (this.$data._defaultType && !this.types.some(t => this[t]))
          return this.$data._defaultType
        const type = this.types.map(t => [t, this[t]]).find(t => t[1])
        return type ? type[0] : null
      }

      // add type array to data
      this._addData({ types: this.types })

      // add tag list and computed tag property if tags array is defined & valid
      if (this.tags) {
        assert(Array.isArray(this.tags), 'tags must be array')
        assert(
          this.tags.length === this.types.length,
          'number of tags must be equal to number of types'
        )
        this._addData({ tags: this.tags })
        this.computed['tag'] = function() {
          return this.tags[this.types.indexOf(this.type)]
        }
      }

      if (this.defaultType) {
        assert(
          () => this.types.includes(this.defaultType),
          `unknown default type "${this.defaultType}"`
        )
        this._addData({ _defaultType: this.defaultType })
      }
    }

    // getClass computed property
    if (!this.computed) this.computed = {}
    this.computed['getClass'] = function() {
      const kebabCase = str =>
        (str[0] + str.slice(1).replace(/([A-Z])/g, '-$1')).toLowerCase()
      return [kebabCase(this.$options.name), this.type]
    }

    this.created = function() {
      if (this.types === undefined) return
      const num_types = this.types.map(t => this[t]).filter(t => t).length
      if (this.types.includes('default') && !num_types) return
      if (this.$data._defaultType) return
      assert(() => num_types > 0, this.$options.name + ' must have a type')
      assert(
        () => num_types < 2,
        this.$options.name + ' must not have multiple types'
      )
    }
  }

  _addData(...data) {
    for (const prop of data)
      this.dataFuncs.push(
        typeof prop === 'function' ? prop : () => Object.assign({}, prop)
      )
    this.data = comp =>
      Object.assign(...this.dataFuncs.map(func => func.call(comp)))
  }
}
