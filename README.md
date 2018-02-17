# eve-daytripper

Stock and loot management for small-scale daytripping expeditions for Eve online.

# Follow on Trello

https://trello.com/b/lMme4zsH/eve-daytripper

---
# App

> app/

Defines actions, api, components, router, middlewares, reducers and store

> *Build:*
$ npm run build

> *Dev:*
$ npm install
$ npm start

# Lambdas

> lambdas/

Lambdas are bundled with `lambdas/utils.js` that implements all the business logic to store/retrieve user data from s3

> *Build:*
$ cd lambdas
$ webpack

# Oauth

> oauth/

oauth page is a stand-alone micro app, check `oauth/'. Users need to be signed-in to Cognito before reaching `oauth/`.

> *Build:*
$ cd oauth/
$ webpack
