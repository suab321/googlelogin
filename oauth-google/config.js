const google=require('passport-google-oauth20').Strategy;
const passport=require('passport');
const {database_google}=require('./db');
const axios=require('axios');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    database_google.findById({_id:id}).then(user=>{done(null,user)}).catch(err=>console.log(err))
})
passport.use(new google({
    callbackURL:"/google/google_redirect",
    clientID:"803777325404-rsv2fmp4mfqqjq6c9lts05t8n4l5om92.apps.googleusercontent.com",
    clientSecret:"lCAVT0rP_NEQbnFqTti95Wrr"
},
(accessToken,refreshToken,profile,done)=>{
    console.log("accesstoken"+accessToken)
    console.log("refreshtoken"+refreshToken)
    database_google.findOne({email:profile.emails[0].value}).then(user=>{
        if(user){
            console.log(`database ${user}`)
            done(null,user);
        }
        else{
            const db=new database_google;
            db.email=profile.emails[0].value;
            db.name=profile.displayName;
            db.google_id=profile.id
            db.save().then(user=>{
                console.log(`new user ${user}`)
                done(null,user)
                axios.post("https://glacial-citadel-47306.herokuapp.com/api/UserSignUps",{email:user.email,name:user.name})
                .then(res=>console.log(res.data));
            }).catch(err=>console.log(err));
        }
    })
  }
))




