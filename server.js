
const express=require('express');
const app=express();
const {router}=require('./oauth-google/route');
const google_authentication=require('./oauth-google/config')
const url=require('./url');

const passport=require('passport');
app.use(passport.initialize())
app.use(express.static('views'));
app.use('/google',router);
app.listen(process.env.PORT||3002);
