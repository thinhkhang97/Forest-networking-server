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

const postTx = {
    version: 1,
    sequence: 8,
    memo: Buffer.from(''),
    operation: 'post',
    params: {
        content: postBuffer,
        keys: [
            Buffer.from('GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO', 'base64'),
            Buffer.from('GBHE24WVKFLUA77IBCMYFHSCEZ6PIVIGE2VYGUBIGAWQ3THZXF2PWMFJ', 'base64'),
            Buffer.from('GASKH5T53W3CGU4XQZ2XEOAKZOXIX3HHAER4DUC3HQH6RXMCNXXCBNXS', 'base64')
        ]
    }
}

// Tx.sign(postTx,PRIVATE_KEY);
// console.log(Tx.encode(postTx).toString('hex'));

// let decodedTx = Tx.decode(Buffer.from('ATBEWv58XBEug/Bf8i4ItsJlZowGS1/Oir522pQ/y5arwaP5AAAAAAAAAAgAAwCgAB8BABxIZWxsbywgdGhpcyBpcyBhIHNlY29uZCBwb3N0AxgzS9+BVDSBi+zztuh9jt0l10wBNgSzyQWA0Q+hzR2BGD2AgR1uTOiEThgRxNuFlShS1AO+yAQjGBR0ghGejyFSBhNlWBlASBgFkN0x2Vxdj1jBSRgEih+U+d1twhlOF0GdlxDgCmTlyF9xxwBEeA1Atx0B+kVzAjV1wgTV0qcohSv9KnX2zQiSjYKibn801AvbXqYfF2K0WA5eZ+vZV0M5r/gcxZXCgA+MWACdQvD457blsJlv3q+YsmcFlgU=', 'base64'));

// console.log(decodedTx);
// console.log(PlainTextContent.decode(decodedTx.params.content));
// console.log(decodedTx.params.keys[0].toString('base64'));

let decodedTx = Tx.decode(Buffer.from('ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAAK4AAwBFAEIBAD9WaeG7h3QgTmFtIHbDtCDEkeG7i2NoIEFGRiBDdXAgMjAxOCEhISDwn4e78J+Hs/Cfh7vwn4ez8J+Hu/Cfh7MAhtb4NWN9436UTcJaxdkNa+uATOUDrQi2ONWbrT66/jVGK6zzG0bwnTIkeePW5vpUDIYQJSvYrJlIDv+JGhIyDA==', 'base64'));
const content = PlainTextContent.decode(decodedTx.params.content)
const keys = decodedTx.params.keys;
const shareWith = [];
if(keys.length > 0)
    keys.map(key => {
        shareWith.push({
            publicKey: key.toString('base64')
        });
    })
console.log(content, shareWith);
