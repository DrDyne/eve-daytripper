const https = require('https')
const express = require('express')
const app = express()

app.get('/api/character', function (req, res) {
  console.log(req.query.token)
  const token = req.query.token

  https.get({
    url: 'https://login.eveonline.com/oauth/verify',
    headers: { Authorization: `Bearer ${token}` },
  }, function (response) {
    var str = '';
    response.on('data', function (chunk) { str += chunk })
    response.on('end', function () {
      console.log('response:', str)
    })
  })
  .on('error', function (err) {
    console.error(err)
  })

  res.send({
    "_FAKE": true,
    "CharacterID": 97042320,
    "CharacterName": "Ghunter Huffalott",
    "ExpiresOn": "2017-09-16T16:55:35",
    "Scopes": "",
    "TokenType": "Character",
  })
})

app.listen(8881, function () {
  console.log('dev-api running on port 8881')
})
