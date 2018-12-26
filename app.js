import {initSystem, getHeight, updateHeight} from './db/fn/system';
import {getHeightOfBlockchain, processBlockData, getTransactionInBlock} from './db/block/func';
import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import proxy from 'http-proxy-middleware';
function connectServer() {
     mongoose.connect('mongodb://localhost:27017/forestnetworking');
}
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'false'}));

app.use(router);

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
            for(let i = heightdb+1; i<=blockHeight; i++) {
                const d = await processBlockData(i);
                if(d === 10)
                return;
            }
            
        }
        await updateHeight(blockHeight);
        await sleep(5000);
    }
}
run()
// connectServer();
// getNewFeed(1,20);

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Sever is running at ${PORT}`);
})
