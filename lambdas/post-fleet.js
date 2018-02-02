import { postFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const charId = event.queryStringParameters.charId

  postFleet(username)
  .then(version => {
    done(null, response.json({version}))
  })
}
