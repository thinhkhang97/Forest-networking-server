import mongoose, { mongo } from 'mongoose';
import person from '../models/person';
import fs from 'fs';

function connectServer() {
    mongoose.connect('mongodb://localhost:27017/forestnetworking');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to db');
    })
}

export function createAccount(publicKey) {
    connectServer();
    const p = new person({
        username: 'Anonymous',
        avatar: {
            data: fs.readFileSync('./db/seed/avatar.png'),
            contentType: 'image/png'
        },
        _id: publicKey,
        balance: 0,
        posts: []
    })
    p.save(function(err, person){
        if(err) console.log('ERROR: ADDED DATA FAIL');
        else console.log('ADDED: ', person);
        mongoose.disconnect();
    })
}

async function getBalance(publicKey) {
    let balance = 0;
    await person.findOne({
        _id: publicKey
    }, function (err, person) {
        balance = person.balance;
    })
    console.log('Balance before: ', balance);
    return balance;
}

export async function payment(publicKey, amount) {
    connectServer();
    const balance = await getBalance(publicKey);
    console.log('Old balance', balance);
    const newBalance = balance + amount;
    person.update({ _id: publicKey },
        { balance: newBalance }, function (err, person) {
            console.log('New Balance', newBalance);
            mongoose.disconnect();
        }
    )
}