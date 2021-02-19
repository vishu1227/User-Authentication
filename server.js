const express=require('express')
const app=express()
const path=require('path')

app.use('/',express.static(path.join(__dirname,'./public')))
app.set('view engine','pug')
app.set('views', path.join(__dirname, './views'));


app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(3000,()=>{
    console.log('Yes the server is live!');
})

// public/css/mobile.css
// /home/bharat/Desktop/Projects/User_Authentication/public/css/mobile.css