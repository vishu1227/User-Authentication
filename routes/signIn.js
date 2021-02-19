const route = require('express').Router();

route.get('/',(req,res)=>{
    res.render('login')
})
route.post('/',(req,res)=>{
    res.send(`<h1>Username: ${req.body.email} , password: ${req.body.password}</h1>`)
})
module.exports = route