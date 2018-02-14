import { postInventory, response } from './utils'

exports.handler = (event, context, done) => {
  const username = event.requestContext.authorizer.claims['cognito:username']
  const { charId } = event.pathParameters

  postInventory(username, charId, event.body)
  .catch(err => {
    console.error(err)
    done(err)
  })
  .then((version="ok") => {
    console.log('inventory:saved', version)
    done(null, response.json({version}))
  })
}
