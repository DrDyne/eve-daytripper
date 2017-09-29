const Jita = '30000142'
const Hek = '30002053'

export const route = (from={}, to={}) => {
  const url = `https://esi.tech.ccp.is/latest/route/${from.id||Hek}/${to.id||Jita}/?datasource=tranquility&flag=shortest`
  return fetch(url)
  .then(response => response.json())
  .then(route => {
    console.log(route)
    return route
  })
}
