import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { SECRET, USER } from '../constants/auth-constants';

const router = express.Router();

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, (username, password, done) => {
  if (username === USER.username && password === USER.password) {
    done(null, USER);
  }
  else {
    done(null, false, 'wrong username or password');
  }
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: '511101469261065',
  clientSecret: 'f6035ef6a60354eabb4076e941fd7281',
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback'
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.use(new TwitterStrategy({
  consumerKey: 'Bk8y2z4fZnB2vqo5tT19mVnWJ',
  consumerSecret: 'B48Yt8nMs0MxJtP2MRDVunEhRTTsuz4Pr58e14IkOWicGO43ST',
  callbackURL: 'http://localhost:8080/api/auth/twitter/callback'
}, (token, tokenSecret, profile, cb) => {
  return cb(null, profile);
}));

passport.use(new GoogleStrategy({
  clientID: '544100861190-4v6ph0uorfoopi5l55m8a8aaatdsndc4.apps.googleusercontent.com',
  clientSecret: '5OIlA_VKRcoRr7lN12WWglZX',
  callbackURL: 'http://localhost:8080/api/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

router.post('/api/auth', (req, res) => {
  const user = req.body;
  if (user.username === USER.username && user.password === USER.password) {
    const payload = { email: USER.email, username: user.username };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'OK',
      data: {
        user: payload
      },
      token
    });
  }
  else {
    res.status(404).json({
      'message': 'Not Found',
      'data': req.body
    });
  }
});

router.post('/api/auth/passport', passport.authenticate('local', { session: false }), (req, res) => {
  res.json(USER);
});

router.get('/api/auth/facebook', passport.authenticate('facebook'));

router.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/failed' }), (req, res) => {
    res.json('success');
  });

router.get('/api/auth/twitter', passport.authenticate('twitter'));

router.get('/api/auth/twitter/callback',
passport.authenticate('twitter', { failureRedirect: '/failed' }), (req, res) => {
  res.json('success');
});

router.get('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/api/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
  res.json('success');
});

export default router;
