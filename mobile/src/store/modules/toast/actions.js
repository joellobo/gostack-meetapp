export function show(options, route) {
  return {
    type: '@toast/SHOW',
    payload: { options, route },
  }
}
