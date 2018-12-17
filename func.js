import { RpcClient } from 'tendermint';
let client = RpcClient('wss://komodo.forest.network:443');
import Tx from './transaction';

export const readBlockData = async (from, to) => {
    /// Optimized
    const calculatedData = {}
    // Loop all blocks to get all data
    for (let i = from; i <= to; i++) {
        const tx = await getTransactionInBlock(i);
        if (tx != null) {
            const data = decodeData(tx[0])
            const account = data.account;
            // Check if block is exist
            if (calculatedData[account] === undefined) {
                calculatedData[account] = {
                    sequence: 0,
                    balance: 0
                }
            }

            const operation = data.operation;
            switch (operation) {
                case 'create_account':
                    const newAccount = data.params.address;
                    calculatedData[newAccount] = {
                        sequence: 0,
                        balance: 0
                    }; break;
                case 'payment':
                    const toAccount = data.params.address;
                    // find the to address
                    if (calculatedData[toAccount] === undefined) {
                        console.log('The to account hasnt in blockchain')
                        return;
                    }
                    const amount = parseInt(data.params.amount);
                    calculatedData[account].balance -= amount;
                    calculatedData[toAccount].balance += amount;
                    break;
            }
            calculatedData[account].sequence = data.sequence;
        }
    }
    return calculatedData;
}

export const genesisBlock = async () => {
    return await client.genesis();
}

export const getHeight = async () => {
    const data = await client.status();
    console.log('blockchain status: ', data);
    return data;
}

function getTransactionInBlock(height) {
    return client.block({ height }).then(res => {
        // const block = res.block;
        // if(block.header.num_txs > 0)
        //     return block.data.txs
        return res.block.data.txs;
    })
}

function decodeData(data) {
    let decodedTx = Tx.decode(Buffer.from(data, 'base64'));
    return decodedTx;
}

