//import fs from 'fs'
//import typeids from './typeids.mock.json'
//import typeids from '../docs/static/typeids.json'
const fs = require( 'fs' )
//const typeids = require( './typeids.mock.json' )
const typeids = require( '../docs/static/typeids.json' )

let names = typeids.map(item => item.name)

const writeToJson = (fileName, fileContent) => {
  return fs.writeFile(`docs/static/${fileName}.json`, JSON.stringify(fileContent), 'utf-8', err => {
    if ( err ) { console.log(err) }

    console.log(`written ${fileContent.length} names`)
  })
}

writeToJson('names', names)
