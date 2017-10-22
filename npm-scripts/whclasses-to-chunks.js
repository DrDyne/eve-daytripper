import json from '../app/store/universe.json'
import fs from 'fs'

const makePath = fileName => `docs/static/wh/classes/${fileName}.json`
const WH_ID = 'id'
const WH_NAME = 'system'
const WH_CLASS = 'class'

console.log('>>> whclasses to chunks (checksum: 2603)')

const wormholes = Object.keys(json)
.filter(systemId => {
  const system = json[systemId]
  return system.hasOwnProperty(WH_CLASS)
})
.map(id => Object.assign({}, json[id], { id }))
console.log(`>> ${Object.keys(wormholes).length} wormholes`)

const fileContent = wormholes
.map(system => {
  return {
    id: system[WH_ID],
    name: system[WH_NAME].toUpperCase(),
    jClass: system[WH_CLASS],
  }
})
.map(({id, name, jClass}) => {
  const sum = name.toUpperCase().replace(/[J-]/g, '').split('').reduce((sum, i) => sum+parseInt(i), 0) || '@'
  return { id, name, sum, jClass }
})
.reduce((memo, {name, sum, jClass}) => {
  ( !memo[sum] )
  ? memo[sum] = { [name]: jClass }
  : memo[sum][name] = jClass
  return memo
}, {})
//console.log(fileContent, '... <- fileContent')

for ( var filename in fileContent ) {
  const path = makePath(filename)
  const json = JSON.stringify(fileContent[filename])

  fs.writeFile(path, json, 'utf-8', err => {
    if ( !err ) return
    console.log('something bad happened Bob.')
    console.error(err)
  })
}

console.log('>> done')
