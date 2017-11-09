const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = (event, context, done) => {
    const username = event.requestContext.authorizer.claims['cognito:username']

    getFleet(username)
    .then(fleet => {
      done(null, {
        statusCode: 200,
        body: JSON.stringify(fleet),
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
      })
    })
}

const getFleet = id => {

  return new Promise((resolve, reject) => {
    s3.getObject({
        Bucket: "eve-daytripper-fleets",
        Key: id + '.json'
    }, (err, data) => {
       if ( err ) reject(err)
       resolve(data)
    })
  })
  .then(data => data.Body.toString())
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
