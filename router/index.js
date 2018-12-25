import express from 'express';
import {getAccount, getSomeAccount} from '../controller/account';
import {getAllNewFeed} from '../controller/newsfeed';
const route = express.Router();

route.get('/forestnetworking/account/:publicKey',getAccount);
route.get('/forestnetworking/allUser/:page&:perpage',getSomeAccount);

route.get('/forestnetworking/newfeed/:page&:perpage',getAllNewFeed);

export default route;