import { getGps, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  getFleet(username)
  .then(gps => {
    done(null, response.json(gps))
  })
}
