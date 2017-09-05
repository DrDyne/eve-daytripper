export const parseQty = (item) => {
  if ( !item.qty ) return 1
  return parseInt(item.qty)
}

export const parseVolume = (item) => {
  if ( !item.volume ) return 0
  return parseFloat(item.volume.replace(/,/g, ''))
}

export const parsePrice = (item) => {
  if ( !item.price ) return 0
  return parseFloat(item.price.replace(/,/g, ''))
}

export const toInventoryItem = item => {
  const [name, qty, group, size, slot, volume, price] = item.split(/\t/)

  return {
    name,
    qty: parseQty({qty}),
    volume: parseVolume({volume}),
    price: parsePrice({price}),
  }
}

export const mergeStacks = (memo, item) => {
  const index = memo.findIndex(m => m.name === item.name)
  if ( index > -1 ) memo[index].qty += item.qty
  else memo.push(item)
  return memo
}

export const hasPrice = item => item.price > 0

export const parseClipboardFromGameClientToJson = pasted => {
  return pasted.split(/\n+/)
  .map(toInventoryItem)
  .reduce(mergeStacks, [])
  .filter(hasPrice)
}
