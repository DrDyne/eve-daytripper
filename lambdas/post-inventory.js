const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, done) => {
  if (!event.requestContext.authorizer) {
    errorResponse('Authorization not configured', context.awsRequestId, done);
    return;
  }

  const charId = 123
  const inventory = {
    items: 'a lot',
    routes: 'many',
  }

  saveInventory(charId, inventory).then(() => {
    done(null, {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  })
}

const saveInventory = (charId, inventory) => {
  console.log('save inventory:', inventory)
  const res = { saved: true }

  return Promise.resolve(res)
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
