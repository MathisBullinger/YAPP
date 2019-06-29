const ALLOW_EVALUATED = true

/*
  ASSERTION FUNCTION - exception will be raised on failure
  if condition is passed as function and runtime is false, it will not be evaluated in production
  failure message is optional
*/
export const assert = (expr, msg, runtime = false) => {
  if (process.env.NODE_ENV === 'production' && !runtime) expr = () => true
  if (!ALLOW_EVALUATED && typeof expr !== 'function')
    throw new Error('assert of evaluated expressions is deactivated')
  if (typeof expr === 'function' ? !expr() : !expr)
    throw new Error(
      msg ||
        'assertion failed' + (typeof expr === 'function' ? `: ${expr}` : '')
    )
}
