// import express from 'express';
// import {RpcClient} from 'tendermint';

// let client = RpcClient('wss://komodo.forest.network:443');

// client.block({height: 2}).then(res=>{
//     console.log(res.block)
// })

// client.txSearch({query: "account=%27GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI%27"}).then(res=>{
//     console.log(res)
// })


import {readBlockData, genesisBlock, getHeight} from './func';

async function getData() {
    const data = await readBlockData(1, 100);
    console.log(data);
}

async function getGenesisBlock() {
    const data = await genesisBlock();
    // console.log('Genesis block: ', data);
}

getData();
// getHeight();

// const data = {}

// const prop = 'abc';
// const val = 123;
// data[prop] = val

// console.log(data['ab']);

