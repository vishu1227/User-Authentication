const route = require('express').Router();
const bcrypt = require('bcrypt'); 
const { use } = require('passport');
const passport=require('passport')

const initializePassport=require('../passport-config')
initializePassport(passport,email=>{
    return users.find(user=> user.email === email)
})

const users = []

route.get('/', (req, res) => {
    res.render('signUp')
})
route.post('/',async (req, res) => {
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/cart/login')
    } catch (err) {
        res.redirect('/cart/register')
    }
})

module.exports = route
