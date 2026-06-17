import { SeItem } from "../data/navigator"

export const filterPermissionMenu = (routes: SeItem[], currentUser): SeItem[] => {
  let defaultArray = routes
  .filter(route => {
    if (!route?.skipCondition) {
      return route
    }
  })
  .map(route => {

    let haveRole = selectRoute(currentUser,route)
    if (haveRole) {
      if (route.children) {

        let data = route?.children.filter(childrenRoute => selectRoute(currentUser,childrenRoute))

        let filterChildenRouter = {
          ...route,
          children: [...data.map(datar => modifyRoute(currentUser,datar))].reduce((a, b) => {
            if (Array.isArray(a) && Array.isArray(b)) return a.concat(b)
            return [...a, b]
          }, [])
        }

        return filterChildenRouter
      }
      return route
    }
    // if (!haveRole) return { id: null }

  })
  return defaultArray
}

const selectRoute =  (currentUser,route) => {
  if (!route?.role || (Array.isArray(route.role) && route.role.length === 0)) {
    return true
  }
  return currentUser?.rights.some(per => route?.role?.includes(per.obj))
}

const modifyRoute = (currentUser,route) => {
        if(!route.children) return [route]
        let data = route.children.filter(childrenRoute => selectRoute(currentUser,childrenRoute))

        let mapRoute = data.map(r => {
            return {
                ...r,
                children: modifyRoute(currentUser,r)
            }
        })

        route.children = mapRoute
        return route
}





export const nestedFind = (routes, _link) => {
  let currentRoutes = routes?.find(r => {
    let match = r?.link == _link
    if (!match && r.children) return nestedFind(r?.children, _link)
    if (match) return r
  })

  return currentRoutes
}

export const updateMenu = (_routes, title: string, _link: string) => {
  let mapMenu = _routes?.map(r => {
    if (r.title == title) {
      r.ischildActive = true
      r.children = updateCollapeRoutes(r.children, true, _link)
      return r
    } else {
      r.ischildActive = false
      r.children = updateCollapeRoutes(r.children, false, _link)
      return r
    }
  })

  return mapMenu
}

const updateCollapeRoutes = (routes: SeItem[], isChildActive: boolean, _link: string) => {
  let mapActiveRoute = routes.map(r => {

    if (r.type == 'collapsable') {
      return {
        ...r,
        ischildActive: isChildActive ? hasUrlInChild(r.children, _link) : false,
        children: updateCollapeRoutes(r.children, isChildActive, _link)
      }
    }

    return r

  })
  return mapActiveRoute
}

const hasUrlInChild = (routes: SeItem[], _link: string) => {
  return routes.some(r => {
    let hasChild = r.link == _link
    if (!hasChild && r.children) {
      return hasUrlInChild(r.children, _link)
    }

    return hasChild
  })
}
