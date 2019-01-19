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
    console.log("my session"+req.user);
    res.redirect(`http://localhost:4200/googlelogin/`);
})

module.exports={router};