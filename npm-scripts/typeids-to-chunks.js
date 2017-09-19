import fs from 'fs'
import { soundex } from '../app/api/utils'
//import typeids from './typeids.mock.json'
import typeids from '../static/typeids.json'

let files = {}

typeids.forEach(({name, id}) => {
  const hash = soundex(name)
  const fileName = hash.charAt(0)
  if ( !files[fileName] ) files[fileName] = {[hash]: [{name, id}]}
  else if ( files[fileName][hash] ) files[fileName][hash].push({name, id})
  else files[fileName][hash] = [{name, id}]
})

if ( Object.keys(files).length < 10 ) console.log(files)

const writeGroupedByFirstChar = files => {
  return Object.keys(files).reduce((promise, fileName) => {
    return promise.then(() => {
      const fileContent = files[fileName]
      console.log(`writing ${fileName}.json`)
      // FIXME ... stuck on '[', probably filesystem won't allow files starting with this char, so blacklist this char or rename file
      return fs.writeFile(`docs/static/typeids/${fileName}.json`, JSON.stringify(fileContent), 'utf-8', err => {
        if ( !err ) return
        console.log(err)
      })
    })
  }, Promise.resolve())
}


const writeSeparate = () => {
  let totalItems = 0
  for ( var fileName in json ) {
    console.log('writing into', fileName+'.json')
    console.log(json[fileName].length, 'items')

    fs.writeFile(`docs/static/typeids/${file}.json`, JSON.stringify(json[fileName]), 'utf-8', err => {
      if ( !err ) return
      console.log('Something bad happened Bob.')
      console.error(err)
    })

    totalItems += json[fileName].length
  }

  console.log(`${totalItems} items / ${Object.keys(json).length} json`)
}

writeGroupedByFirstChar(files)
