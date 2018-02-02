import { getFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const charId = event.queryStringParameters.charId

  getFleet(username, charId)
  .then(fleet => {
    done(null, response.json(fleet))
  })
}
