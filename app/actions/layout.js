export const TOGGLE_SHOW_EMPTY_STOCK = 'layout:toggle:show-empty-stock'
export const TOGGLE_FAVORITE_ROUTES = 'layout:toggle:show-favorite-routes'
export const TOGGLE_SHORTEST_ROUTES = 'layout:toggle:show-shortest-routes'

export const toggleShowEmptyStock = () => ({
  type: TOGGLE_SHOW_EMPTY_STOCK
})

export const toggleFavoriteRoutes = () => ({
  type: TOGGLE_FAVORITE_ROUTES
})

export const toggleSafestShortestRoutes = () => ({
  type: TOGGLE_SHORTEST_ROUTES
})
