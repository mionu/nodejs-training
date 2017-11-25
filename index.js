import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import app from './app';
import session from 'express-session';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import productRoute from './routes/product-route';
import usersRoute from './routes/users-route';
import authRoute from './routes/auth-route';
import { databaseUrl } from './config';

const port = process.env.PORT || 8080;

mongoose.connect(databaseUrl);
mongoose.Promise = global.Promise;
app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(express.json());
app.use(cookieParser);
app.use(queryParser);
app.use(passport.initialize());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/users', usersRoute);
