const express=require('express')
const app=express()
const path=require('path')

app.use('/',express.static(path.join(__dirname,'./public')))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'));

app.use('/cart',require('./routes').route)

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(8000,(err)=>{
    
    if(err)
    {
        console.log('err');
        return;
    }
    console.log('Server is live!')
})
