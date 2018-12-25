const Tx = require('./index');
const vstruct = require('varstruct');
const crypto = require('crypto');
const { Keypair } = require('stellar-base');
<<<<<<< HEAD
// const PRIVATE_KEY = "SCEPN2UYOPBE7ODTPRIM3OUQDOGDG3GI34MKX5FJEE4WIDTU3NCWHD7E";
const PRIVATE_KEY = "SASIBFCRUPO4XKF2QJ5NEVP34ZKBY4VIX6ZMZHUIOSM3EJQ5GR7LVTIJ";
=======
const PRIVATE_KEY = "SCEPN2UYOPBE7ODTPRIM3OUQDOGDG3GI34MKX5FJEE4WIDTU3NCWHD7E";
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
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
<<<<<<< HEAD
let client = RpcClient('wss://gorilla.forest.network:443');
=======
let client = RpcClient('wss://komodo.forest.network:443');
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76

function broadcastCommitTrans(tx) {
    axios.post(`https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`).then(res=>{
    });
}
<<<<<<< HEAD
function broadcastCommitTrans2(t) {
    axios({
        method: 'post',
        url: 'https://komodo.forest.network/broadcast_tx_commit',
        data: {
            tx: t
        }
      }).then(res=>{console.log(res.data)})
}
=======
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76

const myTransaction = {
    version: 1,
    sequence: 3,
    memo: Buffer.from(''),
    operation: 'payment',
    params: {
        address: 'GBCFV7T4LQIS5A7QL7ZC4CFWYJSWNDAGJNP45CV6O3NJIP6LS2V4DI7Z',
        amount: 12
    }
}

Tx.sign(myTransaction,PRIVATE_KEY);
console.log(Tx.encode(myTransaction));
client.broadcastTxCommit({tx: Tx.encode(myTransaction)}).then(res=>{
    console.log(res);
})

<<<<<<< HEAD
// const postBuffer = PlainTextContent.encode({
//     type: 1,
//     text: 'This is another post'
// })


// const keypair = Keypair.fromSecret(PRIVATE_KEY);
// console.log(keypair.publicKey());

// 
=======

const keypair = Keypair.fromSecret(PRIVATE_KEY);
console.log(keypair.publicKey());

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
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76



// const updateAccountTx = {
//     version: 1,
<<<<<<< HEAD
//     sequence: 15,
=======
//     sequence: 12,
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
//     memo: Buffer.from(''),
//     operation: 'update_account',
//     params: {
//         key: 'picture',
<<<<<<< HEAD
//         value: Buffer.from('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')
=======
//         value: Buffer.from(fs.readFileSync('./myavatar.jpg'))
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
//     }
// }

// Tx.sign(updateAccountTx,PRIVATE_KEY);
// console.log(Tx.encode(updateAccountTx).toString('hex'));
<<<<<<< HEAD
// broadcastCommitTrans2(Tx.encode(updateAccountTx));
=======
// broadcastCommitTrans(Tx.encode(updateAccountTx).toString('hex'));
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76


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
<<<<<<< HEAD
//     sequence: 15,
=======
//     sequence: 8,
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
//     memo: Buffer.from(''),
//     operation: 'post',
//     params: {
//         content: postBuffer,
//         keys: [
//             Buffer.from('GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO', 'base64'),
//             Buffer.from('GBHE24WVKFLUA77IBCMYFHSCEZ6PIVIGE2VYGUBIGAWQ3THZXF2PWMFJ', 'base64'),
<<<<<<< HEAD
//         ]
//     }
// }

=======
//             Buffer.from('GASKH5T53W3CGU4XQZ2XEOAKZOXIX3HHAER4DUC3HQH6RXMCNXXCBNXS', 'base64')
//         ]
//     }
// }
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76

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

<<<<<<< HEAD
=======
// let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAAgAAwCgAB8BABxIZWxsbywgdGhpcyBpcyBhIHNlY29uZCBwb3N0AxgzS9+BVDSBi+zztuh9jt0l10wBNgSzyQWA0Q+hzR2BGD2AgR1uTOiEThgRxNuFlShS1AO+yAQjGBR0ghGejyFSBhNlWBlASBgFkN0x2Vxdj1jBSRgEih+U+d1twhlOF0GdlxDgCmTlyF9xxwBEeA1Atx0B+kVzAjV1wgTV0qcohSv9KnX2zQiSjYKibn801AvbXqYfF2K0WA5eZ+vZV0M5r/gcxZXCgA+MWACdQvD457blsJlv3q+YsmcFlgU=', 'base64'));

// console.log(decodedTx);
// console.log(PlainTextContent.decode(decodedTx.params.content));
// console.log(decodedTx.params.keys[0].toString('base64'));

>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
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
<<<<<<< HEAD
// console.log(fs.readFileSync('./myavatar.jpg').toString('base64'));
// console.log('\n');
// let decodedTx = Tx.decode(Buffer.from('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', 'base64'));
// console.log(decodedTx.params.value.toString('base64'));

// let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAA0ABAB4CmZvbGxvd2luZ3MAawADMB3E9jeB6Vq5oRwzKMwi5omyIV71sg7mRlMKKXqNwzMkDCgw2r3wtGoMv73a8fTtyveYCaCt6Q4HEfjtPgmH4EE9us8iLjBOTXLVUVdAf+gImYKeQiZ89FUGJquDUCgwLQ3M+bl0+zCpWBV0tHOzcwchPLWyY1CsCvHAaYRNU9K48HUYVrnC7fPQyPX75u4RBxM3q9w85m7iMgI0g1kM4Ib1iGMttha7BA==', 'base64'));
// console.log(decodedTx);
=======

// let decodedTx = Tx.decode(Buffer.from('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', 'base64'));
// console.log(decodedTx.params.value.toString('base64'));

// let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAAsABAAZBG5hbWUAEk5ndXllbiBUaGluaCBLaGFuZ2pJ8uLSaKDTt7OQNi6K1MNunvBUErP5zx6OROkdhh03z7ji6kNUl0VNs+7PsjP8T+phS9Lp63wyAIw1dtAz/g4=', 'base64'));
// console.log(decodedTx.params.value.toString());
>>>>>>> c3f4f8a3e1d38565571b22052c2b14b01f004a76
// const followingsBuff = decodedTx.params.value;
// Followings.decode(followingsBuff).addresses.map(f=>{
//     console.log(base32.encode(f));
// })
