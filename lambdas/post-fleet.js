import { postFleet, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']

  postFleet(username, event.body)
  .catch(err => {
    console.error(err)
    done(err)
  })
  .then((version="ok") => {
    console.log('fleet:saved', version)
    done(null, response.json({version}))
  })
}
