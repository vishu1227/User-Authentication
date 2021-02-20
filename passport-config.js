const { authenticate, use } = require('passport')

const LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcrypt')


function initialize(passport){

    const authenticateUser=(email,password,done)=>{

        const user=getUserByEmail(email)

        if(user==null)
        {
            return done(null,false,{message: 'NO user with that email'})
        }

        try {
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }
            else{
                return done(null,false,{message: 'Password incorrect'})
            }
        } catch (err) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'}), authenticateUser)

    passport.serializeUser((user,done)=>{ })
    passport.deserializeUser((id,done)=>{ })
}

module.exports=initialize