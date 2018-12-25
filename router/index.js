import express from 'express';
<<<<<<< HEAD
import {getAccount} from '../controller/account';
import {getAllNewFeed} from '../controller/newsfeed';
const route = express.Router();

route.get('/forestnetworking/account/:publicKey',getAccount);
route.get('/forestnetworking/newfeed/:page&:perpage',getAllNewFeed);
=======
import {getAccount, getNewFeed} from '../controller';
const route = express.Router();

route.get('/forestnetworking/account/:publicKey',getAccount);
route.get('/forestnetworking/newfeed/:page&:perpage',getNewFeed);
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
export default route;