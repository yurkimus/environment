import { is } from '@yurkimus/types'

let Strategy = {
  Deno: 'Deno',
  Node: 'Node',
}

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
      return variables => {
        for (let variable of variables)
          if (!Deno.env.has(variable))
            throw new TypeError(`Variable '${variable}' must be specified.`)
      }

    case Strategy.Node:
      return variables => {
        for (let variable of variables)
          if (!(variable in process.env))
            throw new TypeError(`Variable '${variable}' must be specified.`)
      }

    default:
      throw new TypeError(`No strategy '${strategy}' predicate found.`)
  }
}
