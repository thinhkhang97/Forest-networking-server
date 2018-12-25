import {sendResponse} from './index';
let {RpcClient} = require('tendermint');
let client = RpcClient('wss://gorilla.forest.network:443');

export async function postTx(req,res) {
    try{
        const rtx = req.body.txData;
        const r = await client.broadcastTxCommit({tx: rtx});
        console.log(r);
        return sendResponse(res,200,'OK','Posted transaction')
    } catch(e){
        console.log(e);
        return sendResponse(res,200,'Fail','Couldnt Post transaction',e)
    }
}