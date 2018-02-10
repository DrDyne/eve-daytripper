import { getInventory, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const charId = event.queryStringParameters.charId

  getInventory(username, charId)
  .catch(done)
  .then(inventory => {
    done(null, response.json(inventory))
  })
}
