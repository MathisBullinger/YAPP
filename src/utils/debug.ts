const ALLOW_EVALUATED = true

export const assert =
  process.env.NODE_ENV === 'production'
    ? () => true
    : (expr, msg) => {
        if (!ALLOW_EVALUATED && typeof expr !== 'function')
          throw new Error('assert of evaluated expressions is deactivated')
        if (typeof expr === 'function' ? !expr() : !expr)
          throw new Error(
            msg ||
              'assertion failed' +
                (typeof expr === 'function' ? `: ${expr}` : '')
          )
      }
