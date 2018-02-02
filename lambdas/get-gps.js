import { getGps, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const charId = event.queryStringParameters.charId

  getGps(username, charId)
  .then(gps => {
    done(null, response.json(gps))
  })
}
