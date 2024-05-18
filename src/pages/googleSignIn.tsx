import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const app = express();

// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: '232919272449-942l9qgn86l1upss3g9qol8ss8817s9i.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you can handle the user authentication and store user data in your database
    return done(null, profile);
  }
));

// Route for initiating Google OAuth 2.0 authentication
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect or respond as necessary after successful authentication
    res.redirect('/');
  }
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
