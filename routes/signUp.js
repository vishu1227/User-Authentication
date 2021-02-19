const route = require('express').Router();

route.get('/',(req,res)=>{
    res.render('signUp')
})

module.exports = route