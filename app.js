// Init data.
// import {
//     createAccount, payment, getAccountInfo, 
//     updateAccountInfo, createPost, getAllPosts,
//     getPosts
// } from './db/fn';
// import mongoose, { mongo } from 'mongoose';
// function connectServer() {
//     mongoose.connect('mongodb://localhost:27017/forestnetworking');
// }
// connectServer();
// createAccount('GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7');


//// 1-6000 create account and payment,
//// 6001-8000 create, update account, post.

import {processBlockData, getTransactionInBlock} from './db/block/func';
import {createPost} from './db/fn';
import mongoose, { mongo } from 'mongoose';

async function connectServer() {
    await mongoose.connect('mongodb://localhost:27017/forestnetworking');
    console.log('CONNECTED TO SERVER')
}

async function getData() {
    await connectServer();
    for(let i = 1; i <=15000; i++) {
        await processBlockData(i);
    }
    console.log('END GET DATA');
    mongoose.disconnect();
}

async function getData2() {
    await connectServer();
    await processBlockData(3363)
    console.log('END GET DATA');
    mongoose.disconnect();
}

// getTransactionInBlock(3405);

getData();
// connectServer();
// createPost('GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI','No title','hello', []);