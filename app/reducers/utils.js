export const parseQty = (item) => {
  if ( !item.qty ) return 1
  return parseInt(item.qty)
}

export const parseVolume = (item) => {
  if ( !item.m3 ) return 0
  return parseFloat(item.m3.replace(/,/g, ''))
}

export const parsePrice = (item) => {
  if ( !item.isk ) return 0
  return parseFloat(item.isk.replace(/,/g, ''))
}

export const toInventoryItem = item => {
  const [name, qty, group, size, slot, m3, isk] = item.split(/\t/)

  return {
    name,
    qty: parseQty({qty}),
    m3: parseVolume({m3}),
    isk: parsePrice({isk}),
  }
}

export const mergeStacks = (memo, item) => {
  const index = memo.findIndex(m => m.name === item.name)
  if ( index > -1 ) memo[index].qty += item.qty
  else memo.push(item)
  return memo
}

export const hasPrice = item => item.isk > 0

export const parseClipboardFromGameClientToJson = pasted => {
  return pasted.split(/\n+/)
  .map(toInventoryItem)
  .reduce(mergeStacks, [])
  .filter(hasPrice)
}
