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
    connectServer();
    const accountInfo = await getAccountInfo(req.params.publicKey);
    if(accountInfo === null) {
        mongoose.disconnect();
        return sendResponse(res,404,'false','Couldnt find this user in database');
    } else {
        mongoose.disconnect();
        return sendResponse(res,200,'ok','Found the user',accountInfo);
    }
} 