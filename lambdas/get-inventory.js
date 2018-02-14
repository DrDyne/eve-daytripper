import { getInventory, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const { charId } = event.pathParameters

  getInventory(username, charId)
  .catch(err => {
    console.error(err)
    done(err)
  })
  .then(inventory => {
    done(null, response.json(inventory))
  })
}
