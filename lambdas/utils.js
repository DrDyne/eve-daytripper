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
      if ( err ) reject(err)
      resolve(data)
    })
  })
  .then(data => data.Body.toString())
  .catch(err => console.error(err))
)

const postJsonToS3 = (body=null, Bucket, ...key) => (
  new Promise((resolve, reject) => {
    const Key = key.filter(i => !!i).join('/') + '.json'
    console.log({ Bucket, Key })
    s3.putObject({ Bucket, Key, Body: JSON.stringify(body) }, (err, data) => {
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

export const getFleet = (username, charId) => getJsonFromS3(BUCKETS.FLEETS, username, charId)
export const getInventory = (username, charId) => getJsonFromS3(BUCKETS.INVENTORIES, username, charId)
export const getGps = (username, charId) => getJsonFromS3(BUCKETS.GPS, username, charId)

export const postFleet = (username, charId, ...fleet) => postJsonToS3(fleet, BUCKETS.FLEETS, username, charId)
export const postInventory = (username, charId, ...inventory) => postJsonToS3(inventory, BUCKETS.INVENTORIES, username, charId)
export const postGps = (username, charId, ...gps) => postJsonToS3(gps, BUCKETS.GPS, username, charId)
