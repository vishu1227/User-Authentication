const route = require('express').Router()

const signIn = require('./signIn')
const signUp = require('./signUp')

route.use('/login',signIn)
route.use('/signup',signUp)

exports = module.exports = {
    route
}
