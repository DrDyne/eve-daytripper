import { getFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  getFleet(username)
  .catch(err => {
    console.error(err)
    if ( err.errorMessage && ('Access denied' === err.errorMessage) ) done(new Error('fleet does not exist'))
    done(err)
  })
  .then(fleet => {
    if ( !fleet ) done(new Error('fleet does not exist'))
    done(null, response.json(fleet))
  })
}
