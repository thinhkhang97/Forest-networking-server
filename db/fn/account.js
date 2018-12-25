import person from '../models/person';
import fs from 'fs';
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
    await updateSequenceAccount(accountCreate,sequence+1);
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
        balance: 200000000000,
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
    await updateSequenceAccount(PublicKey,Sequence+1);
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
    await updateSequenceAccount(PublicKey,sequence+1);
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
    await updateSequenceAccount(PublicKey,sequence+1);
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