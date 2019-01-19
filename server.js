const session=require('express-session');
const express=require('express');
const app=express();
const {router}=require('./oauth-google/route');
const google_authentication=require('./oauth-google/config')
const {database_google}=require('./oauth-google/db');
const url=require('./url');
const passport=require('passport');

app.use(session({key:'user_sid',secret:"suab321",cookie:{maxAge:null}}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('views'));
app.use('/google',router);
app.get('/gettingdata/:email',(req,res)=>{
    database_google.findOne({email:req.params.email}).then(user=>{
        res.status(200).json(user);
    })
})
app.listen(process.env.PORT||3002);
