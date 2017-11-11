const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const getJsonFromS3 = (bucket, key) => (
  new Promise((resolve, reject) => {
    s3.getObject({
        Bucket: bucket,
        Key: key + '.json'
    }, (err, data) => {
       if ( err ) reject(err)
       resolve(data)
    })
  })
  .then(data => data.Body.toString())
)

const response = {
  json: body => ({
    statusCode: 200,
    body: JSON.stringify(body),
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
  })
}

const BUCKETS = {
  FLEETS: 'eve-daytripper-fleets',
  INVENTORIES: 'eve-daytripper-inventories',
  GPS: 'eve-daytripper-gps',
}
export const getFleet = username => getJsonFromS3(BUCKETS.FLEETS, username)
export const getInventory = username => getJsonFromS3(BUCKETS.INVENTORIES, username)
export const getGps = username => getJsonFromS3(BUCKETS.GPS, username)

export {
  response,
}
