import express from 'express';
import {getAccount, getNewFeed} from '../controller';
const route = express.Router();

route.get('/forestnetworking/account/:publicKey',getAccount);
route.get('/forestnetworking/newfeed/:page&:perpage',getNewFeed);
export default route;