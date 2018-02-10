import { getGps, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const { charId } = event.pathParameters

  getGps(username, charId)
  .catch(err => {
    console.error(err)
    done(err)
  })
  .then(gps => {
    done(null, response.json(gps))
  })
}
