import mongoose, { mongo } from 'mongoose';
function connectServer() {
     mongoose.connect('mongodb://localhost:27017/forestnetworking');
}

export function sendResponse(res, code, success, message, data=null, ) {
    return res.status(code).send({
        success,
        message,
        data
    })
}