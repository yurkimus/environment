import { is } from '@yurkimus/types'

export let Strategy = /** @type {const} */ ({
  Deno: 'Deno',
  Node: 'Node',
})

/**
 * @param {keyof typeof Strategy} strategy
 * @param {string[]} variables
 */
export let verify = (strategy, variables) => {
  if (!is('String', strategy))
    throw new TypeError(`Parameter 'strategy' must be of String type.`)

  if (!(strategy in Strategy))
    throw new TypeError(
      `Parameter 'strategy' must be one of:`
        + `'${Object.keys(Strategy).join(', ')}'.`,
    )

  if (!is('Array', variables))
    throw new TypeError(`Parameter 'variables' must be of Array type.`)

  switch (strategy) {
    case Strategy.Deno:
      for (let variable of variables)
        if (!Deno.env.has(variable))
          throw new TypeError(`Variable '${variable}' must be specified.`)
      break

    case Strategy.Node:
      for (let variable of variables)
        if (!(variable in process.env))
          throw new TypeError(`Variable '${variable}' must be specified.`)
      break

    default:
      throw new TypeError(`No strategy '${strategy}' predicate found.`)
  }
}
