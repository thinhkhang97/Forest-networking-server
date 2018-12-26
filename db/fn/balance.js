import person from '../models/person';
import {updateSequenceAccount} from './account';
export async function getBalance(publicKey) {
    let balance = 0;
    const query = person.findOne({
        publicKey: publicKey
    })
    const promise = await query.exec();
    try{
        balance = promise.balance;
    }catch(e){console.log('ERROR TO GET BALANCE')}
    return balance;
}

export async function payment(publicKey, amount, sequence) {
    // connectServer();
    const balance = await getBalance(publicKey);
    console.log('OLD balance', balance);
    if(publicKey==='GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI' && balance < 0)
        return 10;
    // console.log('Old balance', balance);
    const newBalance = balance + amount;
    const query = person.update(
        { publicKey: publicKey },
        { balance: newBalance },
        {
            upsert: false
        }
    )
    await query.exec();
    return 0;
}