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
    clientID:"548189625097-thi868ras0kpvdiu722b0g4gi4ktecm7.apps.googleusercontent.com",
    clientSecret:"qjMG27T8l9SXqQ4QT1eRe0zZ"
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




