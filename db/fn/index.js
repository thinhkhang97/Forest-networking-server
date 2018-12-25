import mongoose, { mongo } from 'mongoose';
import person from '../models/person';
import system from '../models/system';
import newsfeed from '../models/newfeed';
import fs from 'fs';
import newfeed from '../models/newfeed';

function connectServer() {
    mongoose.connect('mongodb://localhost:27017/forestnetworking');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to db');
    })
}
/////// ACCOUNT ///////
export async function createAccount(publicKey) {
    // connectServer();
    
    const p = new person({
        username: 'Anonymous',
        avatar: {
            data: fs.readFileSync('./db/seed/avatar.png'),
            contentType: 'image/png'
        },
        publicKey: publicKey,
        balance: 0,
        posts: []
    })
    await p.save();
}

export async function initAccount(publicKey) {
    // connectServer();
    const p = new person({
        username: 'Anonymous',
        avatar: {
            data: fs.readFileSync('./db/seed/avatar.png'),
            contentType: 'image/png'
        },
        publicKey: publicKey,
        balance: 200000000000,
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

export async function updateNameAccount (
    PublicKey,
    Username = 'Anonymous',
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
    AvatarData = fs.readFileSync('./db/seed/avatar.png'),
    ContentType = 'image/png'
) {
    // connectServer(); 
    const query = person.update(
        {publicKey: PublicKey},
        {
            avatar: {
                data: AvatarData,
                contentType: ContentType
            }
        },{
            upsert: false
        })
    await query.exec();
}

export async function updateFollowingsAccount (
    PublicKey,
    followings = []
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

/////// -ACCOUNT ///////

async function getBalance(publicKey) {
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

export async function payment(publicKey, amount) {
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


////// POST //////
export async function updatePosts(publicKey, posts) {

}

export async function getAllPosts(publicKey) {
    // connectServer();
    const query = person.findOne({
        publicKey: publicKey
    })
    const promise = await query.exec();
    // console.log('Get posts', posts);
    // mongoose.disconnect();
    return promise.posts;
}

export async function getPosts(publicKey, id) {
    // connectServer();
    let post = null;
    const query = person.findOne({
        publicKey: publicKey
    })
    // console.log('POST FOUND', post);
    const person = await query.exec();
    person.posts.map(p=>{
        if(p.postId == id)
            post = p
    })
    return post;
}

export async function createPost(
    PublicKey,
    Title = 'New post for new day',
    Content = 'Unknown content',
    Time,
    ShareWith = [],
    Image = {},
) {
    // connectServer();
    const allPost = await getAllPosts(PublicKey);
    allPost.push({
        content: Content,
        title: Title,
        time: Time,
        shareWith: ShareWith,
        image: Image
    })
    console.log(allPost);
    const query = person.update({
        publicKey: PublicKey,
    },{
        posts: allPost
    },{
        upsert: false
    })
    await query.exec();
    // add to new feed
    const n = new newsfeed({
        publicKey: PublicKey,
        content: Content,
        title: Title,
        time: Time,
        shareWith: ShareWith,
        image: Image
    })
    await n.save();
}

export async function interactPost(publicKey, postId, interact) {

}

export async function getNewFeed(page, perpage) {
    let data = null;
    console.log('In get all new feeds');
    const query = newfeed.find(
        {},
        {},
        {
            skip:page*perpage, // Starting Row
            limit:perpage, // Ending Row
            sort:{
                time: -1 //Sort by Date Added DESC
            }
        });
    data = await query.exec();
    return data;
}

////// SYSTEM /////
export async function getHeight() {
    let height = -1;
    const query = system.findOne({
        type: 'height'
    })
    const s = await query.exec();
    if(s!=undefined)
        height = s.height
    return height;
} 

export async function updateHeight(Height) {
    const query = system.updateOne({
        type: 'height'
    },{
        height: Height
    })
    await query.exec();
}

export async function initSystem() {
    // create user master
    await initAccount('GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7');
    const s = new system({
        type: 'height',
        height: 0
    });
    await s.save();
}