const AWS = rquire('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, done) => {
  if (!event.requestContext.authorizer) {
    errorResponse('Authorization not configured', context.awsRequestId, done);
    return;
  }

  const charId = 123

  getInventory(charId).then(inventory => {
    done(null, {
      statusCode: 200,
      body: JSON.stringify(inventory),
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  })
}

const getInventory = charId => {
  const inventory = {
    items: 'a lot (from db)',
    routes: 'many (from db)',
  }

  return Promise.resolve(inventory)
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
