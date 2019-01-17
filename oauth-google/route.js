const router=require('express').Router();
const passport=require('passport');


router.get('/login',
    passport.authenticate("google",{
        scope:['profile','email',],
        accessType: 'offline',
        prompt: 'consent',
    })
)
router.get('/google_redirect',passport.authenticate('google',{failureRedirect:'http://localhost:4200/login/student'}),(req,res)=>{
    res.redirect("http://localhost:4200/dashboard/university");
})

module.exports={router};