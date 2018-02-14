const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const BUCKETS = {
  FLEETS: 'eve-daytripper-fleets',
  INVENTORIES: 'eve-daytripper-inventories',
  GPS: 'eve-daytripper-gps',
}

const getJsonFromS3 = (Bucket, ...key) => (
  new Promise((resolve, reject) => {
    const Key = key.filter(i => !!i).join('/') + '.json'
    console.log({ Bucket, Key })
    s3.getObject({ Bucket, Key }, (err, data) => {
      if ( err ) return reject(err)
      resolve(data)
    })
  })
  .then(data => data.Body.toString())
  .then(json => JSON.parse(json))
)

const postJsonToS3 = (Body=null, Bucket, ...key) => (
  new Promise((resolve, reject) => {
    const Key = key.filter(i => !!i).join('/') + '.json'
    console.log({ Bucket, Key }, Body)
    const params = {
      Bucket,
      Key,
      Body: JSON.stringify(Body),
      ContentType: 'application/json',
    }

    s3.putObject(params, (err, data) => {
      if ( err ) reject(err)
      resolve(data)
    })
  })
  .then(data => data.VersionId)
)

export const response = {
  json: body => ({
    statusCode: 200,
    body: JSON.stringify(body),
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
  }),
  error: (errorMessage, awsRequestId, callback) => {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        Error: errorMessage,
        Reference: awsRequestId,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

export const validateCharId = charId => /^(\d)+$/.test(charId)

export const getFleet = (username) => getJsonFromS3(BUCKETS.FLEETS, username)
export const postFleet = (username, fleetJson) => postJsonToS3(fleetJson, BUCKETS.FLEETS, username)

export const getInventory = (username, charId) => {
  if ( !validateCharId(charId) ) throw new Error('invalid charId')
  return getJsonFromS3(BUCKETS.INVENTORIES, username, charId)
}
export const postInventory = (username, charId, inventoryJson) => {
  if ( !validateCharId(charId) ) throw new Error('invalid charId')
  return postJsonToS3(inventoryJson, BUCKETS.INVENTORIES, username, charId)
}

export const getGps = (username, charId) => {
  if ( !validateCharId(charId) ) throw new Error('invalid charId')
  return getJsonFromS3(BUCKETS.GPS, username, charId)
}
export const postGps = (username, charId, gpsJson) => {
  console.log('saving gps')
  if ( !validateCharId(charId) ) throw new Error('invalid charId')
  return postJsonToS3(gpsJson, BUCKETS.GPS, username, charId)
}
