import express from 'express';
import app from './app';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import productRoute from './routes/product-route';
import usersRoute from './routes/users-route';
import authRoute from './routes/auth-route';

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(express.json());
app.use(cookieParser);
app.use(queryParser);
app.use(authRoute);
app.use(productRoute);
app.use(usersRoute);
