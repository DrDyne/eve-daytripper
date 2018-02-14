import { postGps, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const { charId } = event.pathParameters

  postGps(username, charId, event.body)
  .catch(err => {
    console.error('error?', err)
    done(err)
  })
  .then((version="ok") => {
    console.log('gps:saved', version)
    done(null, response.json({version}))
  })
}
