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

// import {processBlockData, getTransactionInBlock} from './db/block/func';
// import {createPost} from './db/fn';
// import mongoose, { mongo } from 'mongoose';

// async function connectServer() {
//     await mongoose.connect('mongodb://localhost:27017/forestnetworking');
//     console.log('CONNECTED TO SERVER')
// }

// async function getData() {
//     await connectServer();
//     for(let i = 6001; i <=10000; i++) {
//         await processBlockData(i);
//     }
//     console.log('END GET DATA');
//     mongoose.disconnect();
// }

// async function getData2() {
//     await connectServer();
//     await processBlockData(3363)
//     console.log('END GET DATA');
//     mongoose.disconnect();
// }

// getTransactionInBlock(3405);

// getData();
// connectServer();
// createPost('GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI','No title','hello', []);

// import {
//     createAccount, payment, getAccountInfo, 
//     addFollowersAccount, createPost, getAllPosts,
//     getPosts
// } from './db/fn';
// import mongoose, { mongo } from 'mongoose';
// function connectServer() {
//     mongoose.connect('mongodb://localhost:27017/forestnetworking');
// }
// connectServer();
// // createAccount('TK1');
// // createAccount('TK2');
// // createAccount('TK3');
// // createAccount('TK4');
// // createAccount('TK5');
// // createAccount('TK6');

// const listFollowings = ['TK1', 'TK4', 'TK5'];
// async function f() {
//     for(let i = 0; i < listFollowings.length; i++) {
//         await addFollowersAccount(listFollowings[i], {
//             publicKey: 'TK3'
//         });
//     }
// }
// f();


import {initSystem, getHeight, updateHeight} from './db/fn';
import {getHeightOfBlockchain, processBlockData} from './db/block/func';
import mongoose, { mongo } from 'mongoose';
function connectServer() {
     mongoose.connect('mongodb://localhost:27017/forestnetworking');
}

// run system 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    connectServer();
    const height = await getHeight();
    console.log('HEIGHT', height);
    if(height === -1) {
        await initSystem();
        console.log('Inited system');
    }
    while(true) {
        // process data
        const blockHeight = await getHeightOfBlockchain();
        const heightdb = await getHeight();
        console.log('Process new data');
        console.log('Current height', heightdb);
        console.log('Height on chain', blockHeight);
        if(heightdb<blockHeight) {
            for(let i = heightdb+1; i<=blockHeight; i++)
                await processBlockData(i);
        }
        updateHeight(blockHeight);
        sleep(2000);
    }
}

run();


// getHeightOfBlockchain();

