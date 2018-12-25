import mongoose, { mongo } from 'mongoose';
<<<<<<< HEAD
=======
import {getAccountInfo} from '../db/fn';
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
function connectServer() {
     mongoose.connect('mongodb://localhost:27017/forestnetworking');
}

<<<<<<< HEAD
export function sendResponse(res, code, success, message, data=null, ) {
=======
function sendResponse(res, code, success, message, data=null, ) {
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
    return res.status(code).send({
        success,
        message,
        data
    })
<<<<<<< HEAD
=======
}

export async function getAccount(req, res) {
    const accountInfo = await getAccountInfo(req.params.publicKey);
    if(accountInfo === null) {
        return sendResponse(res,204,'false','Couldnt find this user in database');
    } else {
        return sendResponse(res,200,'ok','Found the user',accountInfo);
    }
} 

export async function getNewFeed(req, res) {
    console.log('Page:', req.params.page, 'perpage:', req.params.perpage);
    const allNewFeed = await getNewFeed(req.params.page, req.params.perpage);
    if(allNewFeed === null) {
        return sendResponse(res,204,'false','Couldnt find data of newsfeed');
    } else {
        return sendResponse(res,200,'ok','Get all newsfeed',allNewFeed);
    }
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
}