import { postGps, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const charId = event.queryStringParameters.charId

  postGps(username, charId, event.body)
  .catch(done)
  .then(version => {
    done(null, response.json({version}))
  })
}
