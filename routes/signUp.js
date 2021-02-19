const route = require('express').Router();
const bcrypt = require('bcrypt')
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
