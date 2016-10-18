/**
 * Created by acezou on 15/9/2.
 */
import { Route as R } from 'react-router'

export default class Route extends R {
  static createRouteFromReactElement(element) {
    const route = super.createRouteFromReactElement(element)
    if (route && route.component && route.component.onEnter) {
      const _onEnter = route.onEnter
      route.onEnter = async () => {
        await route.component.onEnter(route.component)
        if (_onEnter) await _onEnter.call(route.component, route.component)
      }
    }
    return route
  }
}
