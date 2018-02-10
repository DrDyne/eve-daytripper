import { postFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  postFleet(username, event.body)
  .catch(done)
  .then(version => {
    done(null, response.json({version}))
  })
}
