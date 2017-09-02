export const SET_BREADCRUMBS = 'breadcrumbs:set'
export const SET_BREADCRUMBS_COLOR = 'breadcrumbs:color:set'

export const setBreadcrumbs = items => ({
  type: SET_BREADCRUMBS,
  items
})

export const setBreadcrumbsColor = color => ({
  type: SET_BREADCRUMBS_COLOR,
  color
})
