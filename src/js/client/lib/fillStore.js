export default async function (store, nextState, components) {
  const { params, location } = nextState
  const dispatch = store.dispatch
  return await Promise.all(components.map(async _Component => {
    const Component = _Component && _Component.WrappedComponent || _Component
    if (Component && Component.fetchData) {
      await Component.fetchData({ store, dispatch, params, location })
    }
    return true
  }))
}
