import json from '../app/store/universe.json'
import fs from 'fs'

console.log('>>', Object.keys(json).reduce((memo, id) => json[id].effect ? memo.concat(json[id]) : memo, []).length,
'wormholes with an effect')

const wormholes = Object.keys(json).reduce((memo, id) => {
  return json[id].effect
  ? memo.concat(json[id])
  : memo

}, [])
.map(wormhole => {
  const { system, effect } = wormhole
  const sum = system.toUpperCase().replace(/[J-]/g, '').split('').reduce((sum, i) => sum+parseInt(i), 0)
  return {
    name: system,
    sum,
    effect,
  }
})
.reduce((memo, {name, sum, effect}) => {
  if ( !memo[sum] )
    memo[sum] = { [name]: effect }
  else
    memo[sum][name] = effect

  return memo
}, {})

//console.log(wormholes)
console.log('>>', Object.keys(wormholes).length, 'files will be written')

const makePath = filename => `docs/static/wh/effects/${filename}.json`

for ( var filename in wormholes ) {
  const path = makePath(filename)
  const json = JSON.stringify(wormholes[filename])

  fs.writeFile(path, json, 'utf-8', err => {
    if ( !err ) return
    console.log('Something bad happened Bob.')
    console.error(err)
  })
}

console.log('>> done')
