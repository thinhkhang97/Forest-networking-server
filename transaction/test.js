const Tx = require('./index');
const vstruct = require('varstruct');
const crypto = require('crypto');
const PRIVATE_KEY = "SCEPN2UYOPBE7ODTPRIM3OUQDOGDG3GI34MKX5FJEE4WIDTU3NCWHD7E";
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
let client = RpcClient('wss://komodo.forest.network:443');

function broadcastCommitTrans(tx) {
    axios.post(`https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`).then(res=>{
    });
}

const myTransaction = {
    version: 1,
    sequence: 6,
    memo: Buffer.from(''),
    operation: 'payment',
    params: {
        address: 'GASKH5T53W3CGU4XQZ2XEOAKZOXIX3HHAER4DUC3HQH6RXMCNXXCBNXS',
        amount: 49950000
    }
}

const postBuffer = PlainTextContent.encode({
    type: 1,
    text: 'Hello, this is a second post'
})


// const updateAccountTx = {
//     version: 1,
//     sequence: 11,
//     memo: Buffer.from(''),
//     operation: 'update_account',
//     params: {
//         key: 'name',
//         value: Buffer.from('Nguyen Thinh Khang')
//     }
// }

// Tx.sign(updateAccountTx,PRIVATE_KEY);
// const trans = Tx.encode(updateAccountTx).toString('hex');
// console.log(trans);
// broadcastCommitTrans(trans);
// client.broadcastTxCommit({tx: trans}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });



// const updateAccountTx = {
//     version: 1,
//     sequence: 12,
//     memo: Buffer.from(''),
//     operation: 'update_account',
//     params: {
//         key: 'picture',
//         value: Buffer.from(fs.readFileSync('./myavatar.jpg'))
//     }
// }

// Tx.sign(updateAccountTx,PRIVATE_KEY);
// console.log(Tx.encode(updateAccountTx).toString('hex'));
// broadcastCommitTrans(Tx.encode(updateAccountTx).toString('hex'));


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
//     sequence: 8,
//     memo: Buffer.from(''),
//     operation: 'post',
//     params: {
//         content: postBuffer,
//         keys: [
//             Buffer.from('GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO', 'base64'),
//             Buffer.from('GBHE24WVKFLUA77IBCMYFHSCEZ6PIVIGE2VYGUBIGAWQ3THZXF2PWMFJ', 'base64'),
//             Buffer.from('GASKH5T53W3CGU4XQZ2XEOAKZOXIX3HHAER4DUC3HQH6RXMCNXXCBNXS', 'base64')
//         ]
//     }
// }

// Tx.sign(postTx,PRIVATE_KEY);
// console.log(Tx.encode(postTx).toString('hex'));

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

// let decodedTx = Tx.decode(Buffer.from('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', 'base64'));
// console.log(decodedTx.params.value.toString('base64'));

let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAAsABAAZBG5hbWUAEk5ndXllbiBUaGluaCBLaGFuZ2pJ8uLSaKDTt7OQNi6K1MNunvBUErP5zx6OROkdhh03z7ji6kNUl0VNs+7PsjP8T+phS9Lp63wyAIw1dtAz/g4=', 'base64'));
console.log(decodedTx.params.value.toString());
// const followingsBuff = decodedTx.params.value;
// Followings.decode(followingsBuff).addresses.map(f=>{
//     console.log(base32.encode(f));
// })
