import json from '../app/store/wh-statics.json'
import fs from 'fs'

const makePath = filename => `docs/static/wh/statics/${filename}.json`

console.log('>>> whstatics to chunks (checksum: 2603)')
console.log(`>> ${Object.keys(json).length} wormholes`)

const whs = Object.keys(json).map(id => {
  const sum = id.toUpperCase().replace(/[J-]/g, '').split('').reduce((sum, i) => sum+parseInt(i), 0)
  return { id, sum }
})
.reduce((memo, {id, sum}) => {
  //return Object.assign(memo, { [sum]: (memo[sum] + 1) || 1 })
  if ( !memo[sum] )
    memo[sum] = { [id]: json[id] }
  else
    memo[sum][id] = json[id]

  return memo
}, {})

//console.log(whs) // all jsons
console.log(`>> ${Object.keys(whs).length} files will be written`)

for ( var filename in whs ) {
  const path = makePath(filename)
  const json = JSON.stringify(whs[filename])

  fs.writeFile(path, json, 'utf-8', err => {
    if ( !err ) return
    console.log('Something bad happened Bob.')
    console.error(err)
  })
}

console.log(`>>> done, files written to: ${makePath('{xxx}')}`)
