import * as utils from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  utils.getFleet(username)
  .then(fleet => {
    done(null, utils.response.json(fleet))
  })
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
