import express from 'express';
import {getAccount, getSomeAccount} from '../controller/account';
import {getAllNewFeed} from '../controller/newsfeed';
import {postTx} from '../controller/tx'
const route = express.Router();

route.get('/forestnetworking/account/:publicKey',getAccount);
route.get('/forestnetworking/allUser/:page&:perpage',getSomeAccount);

route.get('/forestnetworking/newfeed/:page&:perpage',getAllNewFeed);
route.post('/forestnetworking/tx/',postTx)
export default route;