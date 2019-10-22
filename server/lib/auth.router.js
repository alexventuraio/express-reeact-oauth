const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('google', { scope: ['profile'] })
const facebookAuth = passport.authenticate('facebook')
const githubAuth = passport.authenticate('github')

// Routes that are triggered by the callbacks from each OAuth provider once
// the user has authenticated successfully
router.get('/oauth/twitter/callback', twitterAuth, authController.twitter)
router.get('/oauth/google/callback', googleAuth, authController.google)
router.get('/oauth/facebook/callback', facebookAuth, authController.facebook)
router.get('/oauth/github/callback', githubAuth, authController.github)

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
})

// Routes that are triggered on the client
router.get('/twitter', twitterAuth)
router.get('/google', googleAuth)
router.get('/facebook', facebookAuth)
router.get('/github', githubAuth)

module.exports = router
