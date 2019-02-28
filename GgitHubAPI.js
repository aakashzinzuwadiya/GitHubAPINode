const express = require('express');
const app = express();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;


passport.use(new GitHubStrategy({
    clientID:'', //ClientId
    clientSecret: '',//Client Secret Key
    callbackURL: "" //Client CallBack Url  
},
function(accessToken,refreshToken,profile,cb) {
    URLSearchParams.findOrCreate({ githubId: profile.id }, function (err,user) {
        return cb(err, user);
    });
}
));

app.get('/auth/github',passport.authenticate('github'));

app.get('/auth/github/callback',passport.authenticate('github', {
     failureRedirect: '/login' }),
     function(req, res) {
        res.redirect('/');
     }
);

app.get('/SuccLogin',function(req,res){
    res.send('Login Success');
});

app.listen(4400);

module.exports = app;