const moment = require('moment');
const Tx = require('./index');
const vstruct = require('varstruct');
const crypto = require('crypto');
const { Keypair } = require('stellar-base');
const PRIVATE_KEY = "SCEPN2UYOPBE7ODTPRIM3OUQDOGDG3GI34MKX5FJEE4WIDTU3NCWHD7E";
// const PRIVATE_KEY = "SASIBFCRUPO4XKF2QJ5NEVP34ZKBY4VIX6ZMZHUIOSM3EJQ5GR7LVTIJ";
const PUBLIC_KEY = "GBCFV7T4LQIS5A7QL7ZC4CFWYJSWNDAGJNP45CV6O3NJIP6LS2V4DI7Z";
const base32 = require('base32.js');
const PlainTextContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
  ]);

const Followings = vstruct([
    { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
  ]);
const fs = require('fs');
const axios = require('axios');
let {RpcClient} = require('tendermint');
let client = RpcClient('wss://gorilla.forest.network:443');

function broadcastCommitTrans(tx) {
    axios.post(`https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`).then(res=>{
    });
}
function broadcastCommitTrans2(t) {
    axios({
        method: 'post',
        url: 'https://komodo.forest.network/broadcast_tx_commit',
        data: {
            tx: t
        }
      }).then(res=>{console.log(res.data)})
}

const myTransaction = {
    version: 1,
    sequence: 17,
    memo: Buffer.from(''),
    operation: 'payment',
    params: {
        address: 'GASKH5T53W3CGU4XQZ2XEOAKZOXIX3HHAER4DUC3HQH6RXMCNXXCBNXS',
        amount: 12
    }
}

const m = moment('2018-12-08T19:13:08.763990788Z')
console.log(m.valueOf());

// Tx.sign(myTransaction,PRIVATE_KEY);
// console.log(Tx.encode(myTransaction).toString('base64'));
// client.broadcastTxCommit({tx: Tx.encode(myTransaction).toString('base64')}).then(res=>{
//     console.log(res);
// })

// const postBuffer = PlainTextContent.encode({
//     type: 1,
//     text: 'This is another post'
// })


// const keypair = Keypair.fromSecret(PRIVATE_KEY);
// console.log(keypair.publicKey());

// 



// const updateAccountTx = {
//     version: 1,
//     sequence: 15,
//     memo: Buffer.from(''),
//     operation: 'update_account',
//     params: {
//         key: 'picture',
//         value: Buffer.from(fs.readFileSync('./myavatar.jpg').toString('base64'))
//     }
// }

// Tx.sign(updateAccountTx,PRIVATE_KEY);
// console.log(Tx.encode(updateAccountTx).toString('base64'));
// client.broadcastTxCommit({tx: Tx.encode(updateAccountTx).toString('base64')}).then(res=>{
//     console.log(res);
// });
// broadcastCommitTrans2(Tx.encode(updateAccountTx));


// const updateAccountTx = {
//     version: 1,
//     sequence: 13,
//     memo: Buffer.from(''),
//     operation: 'update_account',
//     params: {
//         key: 'followings',
//         value: Followings.encode({
//             addresses: [
//                 Buffer.from(base32.decode('GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI')),
//                 Buffer.from(base32.decode('GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO')),
//                 Buffer.from(base32.decode('GBHE24WVKFLUA77IBCMYFHSCEZ6PIVIGE2VYGUBIGAWQ3THZXF2PWMFJ')),
//             ]
//         })
//     }
// }

// Tx.sign(updateAccountTx,PRIVATE_KEY);
// console.log(Tx.encode(updateAccountTx).toString('hex'));
// broadcastCommitTrans(Tx.encode(updateAccountTx).toString('hex'));

// client.broadcastTxCommit({tx: '0x'+Tx.encode(updateAccountTx).toString('hex')}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });
// const postTx = {
//     version: 1,
//     sequence: 15,
//     memo: Buffer.from(''),
//     operation: 'post',
//     params: {
//         content: postBuffer,
//         keys: [
//             Buffer.from('GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO', 'base64'),
//             Buffer.from('GBHE24WVKFLUA77IBCMYFHSCEZ6PIVIGE2VYGUBIGAWQ3THZXF2PWMFJ', 'base64'),
//         ]
//     }
// }


// Tx.sign(postTx,PRIVATE_KEY);
// console.log(Tx.encode(postTx).toString('hex'));
// client.broadcastTxCommit({tx: Tx.encode(postTx)}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

// let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAAgAAwCgAB8BABxIZWxsbywgdGhpcyBpcyBhIHNlY29uZCBwb3N0AxgzS9+BVDSBi+zztuh9jt0l10wBNgSzyQWA0Q+hzR2BGD2AgR1uTOiEThgRxNuFlShS1AO+yAQjGBR0ghGejyFSBhNlWBlASBgFkN0x2Vxdj1jBSRgEih+U+d1twhlOF0GdlxDgCmTlyF9xxwBEeA1Atx0B+kVzAjV1wgTV0qcohSv9KnX2zQiSjYKibn801AvbXqYfF2K0WA5eZ+vZV0M5r/gcxZXCgA+MWACdQvD457blsJlv3q+YsmcFlgU=', 'base64'));

// console.log(decodedTx);
// console.log(PlainTextContent.decode(decodedTx.params.content));
// console.log(decodedTx.params.keys[0].toString('base64'));

// let decodedTx = Tx.decode(Buffer.from('ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAAK4AAwBFAEIBAD9WaeG7h3QgTmFtIHbDtCDEkeG7i2NoIEFGRiBDdXAgMjAxOCEhISDwn4e78J+Hs/Cfh7vwn4ez8J+Hu/Cfh7MAhtb4NWN9436UTcJaxdkNa+uATOUDrQi2ONWbrT66/jVGK6zzG0bwnTIkeePW5vpUDIYQJSvYrJlIDv+JGhIyDA==', 'base64'));
// const content = PlainTextContent.decode(decodedTx.params.content)
// const keys = decodedTx.params.keys;
// const shareWith = [];
// if(keys.length > 0)
//     keys.map(key => {
//         shareWith.push({
//             publicKey: key.toString('base64')
//         });
//     })
// console.log(content, shareWith);
// console.log(fs.readFileSync('./myavatar.jpg').toString('base64'));
// console.log('\n');
// let decodedTx = Tx.decode(Buffer.from('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', 'base64'));
// console.log(decodedTx.params.value.toString('base64'));

// let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAA0ABAB4CmZvbGxvd2luZ3MAawADMB3E9jeB6Vq5oRwzKMwi5omyIV71sg7mRlMKKXqNwzMkDCgw2r3wtGoMv73a8fTtyveYCaCt6Q4HEfjtPgmH4EE9us8iLjBOTXLVUVdAf+gImYKeQiZ89FUGJquDUCgwLQ3M+bl0+zCpWBV0tHOzcwchPLWyY1CsCvHAaYRNU9K48HUYVrnC7fPQyPX75u4RBxM3q9w85m7iMgI0g1kM4Ib1iGMttha7BA==', 'base64'));
// console.log(decodedTx);
// const followingsBuff = decodedTx.params.value;
// Followings.decode(followingsBuff).addresses.map(f=>{
//     console.log(base32.encode(f));
// })
