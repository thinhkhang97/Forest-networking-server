import {sendResponse} from './index';
let {RpcClient} = require('tendermint');
let client = RpcClient('wss://gorilla.forest.network:443');

export async function postTx(req,res) {
    try{
        const rtx = req.body.txData;
        const r = await client.broadcastTxCommit({tx: rtx});
        console.log(r);
        if(r.check_tx.code) {
            return sendResponse(res,200,'Fail','Fail to posted transaction');
        }
        return sendResponse(res,200,'OK','Posted transaction')
    } catch(e){
        console.log(e);
        return sendResponse(res,200,'Fail','Couldnt Post transaction',e)
    }
}