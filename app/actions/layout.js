export const TOGGLE_SHOW_EMPTY_STOCK = 'layout:toggle:show-empty-stock'
export const TOGGLE_FAVORITE_ROUTES = 'layout:toggle:show-favorite-routes'
export const TOGGLE_SHORTEST_ROUTES = 'layout:toggle:show-shortest-routes'
export const TOGGLE_SIDE_FLEET = 'layout:toggle:side:fleet'
export const TOGGLE_SIDE_INVENTORY = 'layout:toggle:side:inventory'
export const TOGGLE_SIDE_NAVIGATION = 'layout:toggle:side:navigation'
export const PROFILE_LOAD_START = 'layout:profile:load:start'
export const PROFILE_LOAD_END = 'layout:profile:load:end'
export const SKIP_ORIGINS_HISTORY = 'layout:origins:skip'

export const toggleShowEmptyStock = () => ({ type: TOGGLE_SHOW_EMPTY_STOCK })
export const toggleFavoriteRoutes = () => ({ type: TOGGLE_FAVORITE_ROUTES })
export const toggleSafestShortestRoutes = () => ({ type: TOGGLE_SHORTEST_ROUTES })
export const toggleFleetVisibility = () => ({ type: TOGGLE_SIDE_FLEET })
export const toggleInventoryVisibility = () => ({ type: TOGGLE_SIDE_INVENTORY })
export const toggleNavigationVisibility = () => ({ type: TOGGLE_SIDE_NAVIGATION })
export const loadProfile = () => ({ type: PROFILE_LOAD_START })
export const profileLoaded = () => ({ type: PROFILE_LOAD_END })
export const skipOriginsHistory = () => (dispatch, getState) => {
  const { history } = getState()
  dispatch({
    type: SKIP_ORIGINS_HISTORY,
    nbOrigins: history.origins.length
  })
}
