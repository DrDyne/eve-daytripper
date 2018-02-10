import { getFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  getFleet(username)
  .catch(done)
  .then(fleet => {
    if ( !fleet ) done('fleet does not exist')
    done(null, response.json(fleet))
  })
}
