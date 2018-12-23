import express from 'express';
import {getAccount} from '../controller';
const route = express.Router();

route.get('/forestnetworking/account/:publicKey',getAccount);

export default route;