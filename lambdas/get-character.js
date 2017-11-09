const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, done) => {
  if (!event.requestContext.authorizer) {
    errorResponse('Authorization not configured', context.awsRequestId, done);
    return;
  }

  const id = 123

  getChar(id).then(char => {
    done(null, {
      statusCode: 200,
      body: JSON.stringify(char),
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  })
}

const getChar = id => {
  const char = {
    id: 123,
    name: 'bob ghunter',
  }

  return Promise.resolve(char)
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
