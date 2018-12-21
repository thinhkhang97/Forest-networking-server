import { RpcClient } from 'tendermint';
let client = RpcClient('wss://komodo.forest.network:443');
import Tx from '../../transaction';
import {
    createAccount, payment, getAccountInfo,
    updateAccountInfo, createPost, getAllPosts,
    getPosts
} from '../fn';
const vstruct = require('varstruct');
const PlainTextContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

// Read the data in block and import to data base
export const processBlockData = async (height) => {
    // Loop all blocks to get all data
    const tx = await getTransactionInBlock(height);
    if (tx != null) {
        console.log('PROCESS HEIGHT:',height);
        const data = decodeData(tx[0])
        const account = data.account;
        const operation = data.operation;
        switch (operation) {
            case 'create_account':
                const newAccount = data.params.address;
                const isExistNewAccount = await getAccountInfo(newAccount);
                if (isExistNewAccount != null) {
                    console.log('Account is already exist');
                    return;
                }
                console.log( 'CREATE ACCOUNT', account, 'SEQUENCE', 0, 'BALANCE', 0, 'POSTS', []);
                await createAccount(newAccount);
                break;
            case 'payment':
                const toAccount = data.params.address;
                const isExistPayment = await getAccountInfo(toAccount);
                if (isExistPayment === null) {
                    console.log('Account payment isnt exist');
                    return;
                }
                // find the to address
                const amount = parseInt(data.params.amount);
                console.log('ACCOUNT PAYMENT: FROM', account, 'TO', toAccount, 'AMOUNT', amount);
                await payment(account, 0 - amount);
                await payment(toAccount, amount);
                break;
            case 'post':
                try {
                    const content = PlainTextContent.decode(data.params.content)
                    const keys = data.params.keys;
                    const shareWith = [];
                    keys.map(key => {
                        shareWith.push({
                            publicKey: key.toString('base64')
                        });
                    })
                    console.log('POST: FROM', account, 'CONTENT', content, 'SHARE WITH', shareWith);
                    createPost(account, 'No title',content.text,shareWith);
                } catch(err) {
                    console.log('ERROR TO READ BLOCK');
                }
                break;
            case 'update_account': 
                console.log('UPDATE ACCOUNT');
                break;
            case 'interact':
                console.log('INTERACT');
                break;
        }
    }
}

export const genesisBlock = async () => {
    return await client.genesis();
}

export const getHeight = async () => {
    const data = await client.status();
    console.log('blockchain status: ', data);
    return data;
}

export const getAllTx = async (from, to) => {
    const allData = [];
    for (let i = from; i <= to; i++) {
        const txs = await getTransactionInBlock(i);
        // if(txs != null) {
        //     const data = decodeData(txs[0]);
        //     allData.push(data);
        // }
        // console.log(txs);
    }
    return allData;
}

export function getTransactionInBlock(height) {
    return client.block({ height }).then(res => {
        const block = res.block;
        if (block.header.num_txs > 0) {
            console.log(block.data.txs);
            return block.data.txs
        }
        // return res.block.data.txs;
        // return res;
    })
}

function decodeData(data) {
    let decodedTx = Tx.decode(Buffer.from(data, 'base64'));
    return decodedTx;
}

