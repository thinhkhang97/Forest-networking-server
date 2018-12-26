import person from '../models/person';
import {getBalance} from './balance'
import fs from 'fs';
import moment from 'moment';

export async function createAccount(accountCreate,publicKey, sequence) {
    // connectServer();
    const p = new person({
        username: 'Anonymous',
        avatar: {
            data: fs.readFileSync('./db/seed/avatar.png').toString('base64'),
            contentType: 'image/png'
        },
        publicKey: publicKey,
        balance: 0,
        sequence: 0,
        posts: []
    })
    await p.save();
}

export async function getTimeline(publicKey) {
    // connectServer();
    const query = person.findOne({
        publicKey: publicKey
    })
    const promise = await query.exec();
    // console.log('Get posts', posts);
    // mongoose.disconnect();
    return promise.timeline;
}

export async function addTimeline(
    PublicKey,
    Data,
    Time
) {
    // connectServer();
    const Timeline = await getTimeline(PublicKey);
    Timeline.push({
        data: Data,
        time: Time
    })
    const query = person.update({
        publicKey: PublicKey,
    },{
        timeline: Timeline
    },{
        upsert: false
    })
    await query.exec();
}

export async function initAccount(publicKey) {
    // connectServer();
    const p = new person({
        username: 'Anonymous',
        avatar: {
            data: fs.readFileSync('./db/seed/avatar.png').toString('base64'),
            contentType: 'image/png'
        },
        publicKey: publicKey,
        balance: 9007199254740991,
        sequence: 0,
        posts: []
    })
    await p.save();
}

export async function getAccountInfo(publicKey) {
    // connectServer();
    const query = person.findOne({
        publicKey: publicKey
    })
    const promise = await query.exec();
    // console.log('Account: ', accountInfo);
    // mongoose.disconnect();
    return promise;
}

export async function updateSequenceAccount(PublicKey, Sequence) {
    const query = person.update(
        {publicKey: PublicKey},
        {
            sequence: Sequence,
        },{
            upsert: false
        });
    await query.exec();
}

export async function updateNameAccount (
    PublicKey,
    Username = 'Anonymous',
    Sequence
) {
    // connectServer(); 
    const query = person.update(
        {publicKey: PublicKey},
        {
            username: Username,
        },{
            upsert: false
        });
    await query.exec();
}

export async function updateImageAccount (
    PublicKey,
    AvatarData = fs.readFileSync('./db/seed/avatar.png').toString('base64'),
    ContentUrl = `image/${PublicKey}`,
    sequence
) {
    // connectServer(); 
    const query = person.update(
        {publicKey: PublicKey},
        {
            avatar: {
                data: AvatarData,
                contentUrl: ContentUrl
            }
        },{
            upsert: false
        })
    await query.exec();
}

export async function updateFollowingsAccount (
    PublicKey,
    followings = [],
    sequence
) {
    // connectServer(); 
    const query = person.update(
        {publicKey: PublicKey},
        {
            following: followings 
        },{
            upsert: false
        })
    await query.exec();
}
async function isFollowerExist(publicKey, follower) {
    let isExist = false;
    // console.log('CHECK', publicKey, follower);
    const query = person.findOne({
        publicKey: publicKey,
    })

    const person = await query.exec();
    if(person)
        for(let i = 0; i < person.followers.length; i++) {
            if(person.followers[i].publicKey === follower)
                isExist = true; 
        }
    else isExist = true;
    // console.log(isExist);
    return isExist;
}
export async function addFollowersAccount (
    PublicKey,
    follower
) {
    const isExist = await isFollowerExist(PublicKey, follower.publicKey);
    if(isExist === false) {
        const query =  person.update(
            {publicKey: PublicKey},
            {
                $push: {
                    followers: follower
                }
            },{
                upsert: false
            })
        await query.exec();
    }
}

export async function getSomeUser(page, perpage) {
    const query = person.find(
        {},
        {},
        {
            skip:page*perpage, // Starting Row
            limit:perpage, // Ending Row
            sort:{
                publicKey: -1 //Sort by Date Added DESC
            }
        })
    const data = await query.exec();
    return data;
}

async function getMaxEnergy(publicKey) {
    const currentCell = await getBalance(publicKey);
    return currentCell*(22020096*86400/9007199254740991);
}

async function getCurrentEnergy(publicKey) {
    const query = person.findOne({
        publicKey: publicKey
    })
    const promise = await query.exec();
    // console.log('Account: ', accountInfo);
    // mongoose.disconnect();
    return promise.energy;
}

export async function updateEnergy(publicKey, time) {
    const currentEnergy = await getCurrentEnergy(publicKey);
    if(currentEnergy) {
        const ce = currentEnergy.data;
        const lt = moment(lt.time).valueOf();
        const curTime = moment(time).valueOf();
        const energyInCKIBD = ce*Math.max(0, (86400 - (curTime-lt))/86400);
        const maxE = await getMaxEnergy(publicKey);
        const updatedE = maxE - energyInCKIBD;
    } else {

    } 
}