const router=require('express').Router();
const passport=require('passport');


router.get('/login',
    passport.authenticate("google",{
        scope:['profile','email',],
        accessType: 'offline',
        prompt: 'consent',
    })
)
router.get('/google_redirect',passport.authenticate('google',{failureRedirect:'http://localhost:3002/redirect.html'}),(req,res)=>{
    res.redirect("http://localhost:3002/redirect.html");
})

module.exports={router};