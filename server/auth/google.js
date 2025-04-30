const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mdw = require('./middlewares');  
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

//console.log("Client ID: ", process.env.GOOGLE_CLIENT_ID);
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

router.get('/',
    passport.authenticate('google', {scope: ['profile', 'email'] })
);


router.get('/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    async (req, res) => {
        const token = mdw.generateJWT(req.user);
        const result = await prisma.user.findFirst({
            where:{
                email: req.user.email
            }
        })
        if(result){
            req.dbUser = result;
        }else{
            const result = await prisma.user.create({
                data: {
                    photo: req.user.photos[0].value,
                    fname: req.user.name.givenName,
                    lname: req.user.name.familyName,
                    email: req.user.emails[0].value,
                    provider: req.user.provider,
                    providerId: req.user.id,
                }
            });
        }
        res.redirect(`http://localhost:5001?token=${token}`); // Redirect to Svelte frontend with JWT
    }
);

module.exports = router;