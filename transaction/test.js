const Tx = require('./index');
const vstruct = require('varstruct');
const crypto = require('crypto');
const PRIVATE_KEY = "SCEPN2UYOPBE7ODTPRIM3OUQDOGDG3GI34MKX5FJEE4WIDTU3NCWHD7E";
const PUBLIC_KEY = "GBCFV7T4LQIS5A7QL7ZC4CFWYJSWNDAGJNP45CV6O3NJIP6LS2V4DI7Z";


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

// Tx.sign(myTransaction,PRIVATE_KEY);
// console.log(Tx.encode(myTransaction).toString('hex'));

let decodedTx = Tx.decode(Buffer.from('ATA8i2kusx/LGR5eAZ/7L2FhJIL8wtK3QdYou1L0XkGbXSLfAAAAAAAAAAEAAQAjMB3E9jeB6Vq5oRwzKMwi5omyIV71sg7mRlMKKXqNwzMkDCjZtz7CjPZuCL8TmGDO2fjIH8UcLxNYBM2KkRb/l89C7vMg3wITL2dmGwQXihie7bgL20r1i5yu+6PO//p89GUJ', 'base64'));
console.log(decodedTx);