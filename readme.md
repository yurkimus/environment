# Environment

Utility to verify that all environment keys exist.

## Exports

### Strategy

```
Strategy =
  | Deno
  | Node
```

### verify

```
verify :: strategy, variables =>
  | TypeError
  | undefined
```
