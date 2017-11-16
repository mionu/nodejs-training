import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { SECRET } from '../constants/auth-constants';
import * as userController from '../controllers/user-controller';

const router = express.Router();

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, (username, password, done) => {
  userController.findOne({ where: { username } })
  .then(user => {
    if (password === user.password) {
      done(null, user);
    } else {
      return Promise.reject({ error: 'wrong password' });
    }
  })
  .catch(error => done(null, false, error));
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

router.post('/', (req, res) => {
  const { username, password } = req.body;
  userController.findOne({ where: { username } })
  .then(user => {
    if (password === user.password) {
      const payload = user.get();
      const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
      res.status(200).json({
        message: 'OK',
        data: {
          user: payload
        },
        token
      });
    } else {
      return Promise.reject({ error: 'wrong password' })
    }
  })
  .catch(error => res.status(400).json(error));
});

router.post('/passport', passport.authenticate('local', { session: false }), (req, res) => {
  res.json('success');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/failed' }), (req, res) => {
    res.json('success');
  });

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
passport.authenticate('twitter', { failureRedirect: '/failed' }), (req, res) => {
  res.json('success');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
  res.json('success');
});

export default router;
