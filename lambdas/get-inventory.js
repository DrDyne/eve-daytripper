import { getInventory, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  getInventory(username).then(inventory => {
    done(null, response.json(inventory))
  })
}
