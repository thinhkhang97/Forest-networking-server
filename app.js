// import {readBlockData, genesisBlock, getAllTx} from './func';

// async function getData() {
//     const data = await getAllTx(1, 10);
//     console.log(data);
// }

// async function getGenesisBlock() {
//     const data = await genesisBlock();
//     // console.log('Genesis block: ', data);
// }

// getData();

// Test using mongo db
import mongoose, { mongo } from 'mongoose';
import people from './db/seed/person-seeder';
import system from './db/seed/system-seeder';

import person from './db/models/person';

mongoose.connect('mongodb://localhost:27017/forestnetworking');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to db');
})

// people[0].save(function(){
//     console.log('Added data');
// });

// system.save(function(){
//     console.log('Set up system');
//     mongoose.disconnect();
// })

// // Find info
// const query = person.findOne({
//     _id: 'GBCFV7T4LQIS5A7QL7ZC4CFWYJSWNDAGJNP45CV6O3NJIP6LS2V4DI7Z'
// }, function(err,person){
//     console.log(person)
// });
// query.select('posts');
// query.exec((err, person)=>{
//     console.log(person.posts);
//     mongoose.disconnect();
// })

// Update info
async function getBalance() {
    let balance = 0;
    await person.findOne({
        _id: 'GBCFV7T4LQIS5A7QL7ZC4CFWYJSWNDAGJNP45CV6O3NJIP6LS2V4DI7Z'
    }, function(err, person){
        balance = person.balance;
    })
    console.log('Balance before: ', balance);
    return balance;
}

async function updateBalance() {
    const balance = await getBalance();
    const newBalance = balance - 100;
    person.update({ _id: 'GBCFV7T4LQIS5A7QL7ZC4CFWYJSWNDAGJNP45CV6O3NJIP6LS2V4DI7Z' },
        { balance: newBalance }, function (err, person) {
            console.log('New Balance', newBalance);
            mongoose.disconnect();
        }
    )
}

updateBalance();