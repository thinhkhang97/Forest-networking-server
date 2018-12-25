import { RpcClient } from 'tendermint';
<<<<<<< HEAD
let client = RpcClient('wss://zebra.forest.network:443');
import Tx from '../../transaction';
const base32 = require('base32.js');
import {
    createAccount, 
    getAccountInfo,
    updateFollowingsAccount,
    updateImageAccount,
    updateNameAccount,
    addFollowersAccount
} from '../fn/account';
import {payment} from '../fn/balance';
import {createPost, } from '../fn/newsfeed';
=======
let client = RpcClient('wss://komodo.forest.network:443');
import Tx from '../../transaction';
const base32 = require('base32.js');
import {
    createAccount, payment, getAccountInfo,
    updateNameAccount, createPost, getAllPosts,
    getPosts, updateImageAccount, updateFollowingsAccount,
    addFollowersAccount
} from '../fn';
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
const vstruct = require('varstruct');
const PlainTextContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);
const Followings = vstruct([
    { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
  ]);

// Read the data in block and import to data base
export const processBlockData = async (height) => {
    const tx = await getTransactionInBlock(height);
    if (tx != null) {
        console.log('PROCESS HEIGHT:',height);
        const data = decodeData(tx.data)
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
                console.log( 'ACCOUNT', account,'CREATE ACCOUNT', newAccount, 'SEQUENCE', 0, 'BALANCE', 0, 'POSTS', []);
<<<<<<< HEAD
                await createAccount(account,newAccount,data.sequence);
=======
                await createAccount(newAccount);
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
                return;
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
<<<<<<< HEAD
                const d = await payment(account, 0 - amount, data.sequence);
                await payment(toAccount, amount, null);
=======
                const d = await payment(account, 0 - amount);
                await payment(toAccount, amount);
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
                return d;
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
<<<<<<< HEAD
                    await createPost(account, 'No title',content.text,tx.time,shareWith, data.sequence);
=======
                    await createPost(account, 'No title',content.text,tx.time,shareWith);
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
                } catch(err) {
                    console.log('ERROR TO READ BLOCK');
                }
                return;
            case 'update_account': 
                try {
                    switch (data.params.key) {
                        case 'name':
                            const name = data.params.value.toString();
<<<<<<< HEAD
                            await updateNameAccount(account,name,data.sequence);
                            console.log('UPDATE ACCOUNT', account, 'NAME', name);
                                return;
                        case 'picture':
                            const imgData = data.params.value.toString('base64');
                            await updateImageAccount(account,imgData,data.sequence);
=======
                            await updateNameAccount(account,name);
                            console.log('UPDATE ACCOUNT', account, 'NAME', name);
                                return;
                        case 'picture':
                            const imgData = data.params.value.toString();
                            await updateImageAccount(account,imgData);
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
                            console.log('UPDATE ACCOUNT', account, 'IMAGE');
                                return;
                        case 'followings':
                            const listFollowing = Followings.decode(data.params.value).addresses;
                            const followingsData = listFollowing.map(f=>{
                                return {
                                    publicKey: base32.encode(f)
                                }
                            })
                            console.log('UPDATE ACCOUNT', account, 'FOLLOWING', followingsData);
<<<<<<< HEAD
                            await updateFollowingsAccount(account,followingsData,data.sequence);
=======
                            await updateFollowingsAccount(account,followingsData);
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
                            for(let id = 0; id < listFollowing.length; id++) {
                                await addFollowersAccount(followingsData[id].publicKey, {
                                    publicKey: account
                                });
                            }
                            return;
                    }
                }catch(err){
                    console.log('ERROR READING UPDATE ACCOUNT BLOCK')
                }
                return;
            case 'interact':
                console.log('INTERACT');
                break;
        }
    }
}

export const genesisBlock = async () => {
    return await client.genesis();
}

export const getHeightOfBlockchain = async () => {
    const data = await client.status();
    console.log('blockchain status: ', data.sync_info.latest_block_height);
    return data.sync_info.latest_block_height;
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
            const txinfo = {
                time: block.header.time,
                data: block.data.txs[0]
            }
            console.log(txinfo);
            return txinfo;
        }
        // return res.block.data.txs;
        // return res;
    })
}

function decodeData(data) {
    let decodedTx = Tx.decode(Buffer.from(data, 'base64'));
    return decodedTx;
}

