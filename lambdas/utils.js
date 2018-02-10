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
    const params = {
      Bucket,
      Key,
      Body: JSON.stringify(body),
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


export const validateCharId = charId => /^(\d){7,7}$/.test(charId)

export const getFleet = (username) => getJsonFromS3(BUCKETS.FLEETS, username)
export const postFleet = (username, fleet) => postJsonToS3(fleet, BUCKETS.FLEETS, username)

export const getInventory = (username, charId) => {
  if ( !validateCharId(charId) ) throw 'invalid charId'
  return getJsonFromS3(BUCKETS.INVENTORIES, username, charId)
}
export const postInventory = (username, charId, inventory) => {
  if ( !validateCharId(charId) ) throw 'invalid charId'
  return postJsonToS3(inventory, BUCKETS.INVENTORIES, username, charId)
}

export const getGps = (username, charId) => {
  if ( !validateCharId(charId) ) throw 'invalid charId'
  return getJsonFromS3(BUCKETS.GPS, username, charId)
}
export const postGps = (username, charId, gps) => {
  if ( !validateCharId(charId) ) throw 'invalid charId'
  return postJsonToS3(gps, BUCKETS.GPS, username, charId)
}
