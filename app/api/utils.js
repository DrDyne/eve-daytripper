const blacklist = [
  `'`,
  '[',
  '*',
  '?',
  ' ',
  '#',
  `\\`,
]
export const isWormhole = name => /^J[0-9]{6}$/.test(name.toUpperCase())
export const wormholeId = system => system.name.toUpperCase().replace(/[J-]/g, '').split('').reduce((sum, i) => sum+parseInt(i), 0)

export const soundex = (str) => {
  let chars = str.toLowerCase().split('')
  let firstChar = chars.shift()
  if ( blacklist.includes(firstChar) ) firstChar = '@'

  const codes = {
    a: '', e: '', i: '', o: '', u: '',
    b: 1, f: 1, p: 1, v: 1,
    c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
    d: 3, t: 3,
    l: 4,
    m: 5, n: 5,
    r: 6
  }

  const code = chars.map(char => codes[char])
   .filter((char, index, array) => ((index === 0)
     ? char !== codes[firstChar]
     : char !== array[index - 1])
   )
   .join('')

  return `${firstChar}${code}000`.slice(0, 4).toUpperCase()
}

export const makePortraitUrl = id => `http://image.eveonline.com/Character/${id}_64.jpg`
