import mongoose, { mongo } from 'mongoose';
import {getAccountInfo} from '../db/fn';
function connectServer() {
     mongoose.connect('mongodb://localhost:27017/forestnetworking');
}

function sendResponse(res, code, success, message, data=null, ) {
    return res.status(code).send({
        success,
        message,
        data
    })
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
}