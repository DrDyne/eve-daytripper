import { getFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  getFleet(username)
  .then(fleet => {
    done(null, response.json(fleet))
  })
}
