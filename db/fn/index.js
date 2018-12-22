import mongoose, { mongo } from 'mongoose';
import person from '../models/person';
import system from '../models/system';
import fs from 'fs';

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
    await p.save(function(err, person){
        if(err) console.log('ERROR: CREATE ACCOUNT FAIL');
        // else console.log('ACCOUNT: ', person);
        // mongoose.disconnect();
    })
}

export async function getAccountInfo(publicKey) {
    // connectServer();
    let accountInfo = null;
    await person.findOne({
        publicKey: publicKey
    }, function(err, person){
        accountInfo = person;
    })
    // console.log('Account: ', accountInfo);
    // mongoose.disconnect();
    return accountInfo;
}

export async function updateNameAccount (
    PublicKey,
    Username = 'Anonymous',
    AvatarData = fs.readFileSync('./db/seed/avatar.png'),
    ContentType = 'image/png'
) {
    // connectServer(); 
    await person.update(
        {publicKey: PublicKey},
        {
            username: Username,
        }, function(err, person) {
            if(err) console.log('ERROR', err);
            // else console.log('UPDATED: ', person);
            // mongoose.disconnect();
        }
        )
}

export async function updateImageAccount (
    PublicKey,
    AvatarData = fs.readFileSync('./db/seed/avatar.png'),
    ContentType = 'image/png'
) {
    // connectServer(); 
    await person.update(
        {publicKey: PublicKey},
        {
            avatar: {
                data: AvatarData,
                contentType: ContentType
            }
        }, function(err, person) {
            if(err) console.log('ERROR', err);
            // else console.log('UPDATED: ', person);
            // mongoose.disconnect();
        }
        )
}

export async function updateFollowingsAccount (
    PublicKey,
    followings = []
) {
    // connectServer(); 
    await person.update(
        {publicKey: PublicKey},
        {
            following: followings 
        }, function(err, person) {
            if(err) console.log('ERROR', err);
            // else console.log('UPDATED: ', person);
            // mongoose.disconnect();
        }
        )
}
async function isFollowerExist(publicKey, follower) {
    let isExist = false;
    // console.log('CHECK', publicKey, follower);
    await person.findOne({
        publicKey: publicKey,
    }, function(err, person){
        if(err) console.log('ERROR WHEN FIND FOLLOWER');
        else {
            // console.log(person.followers)
            if(person !== null)
                for(let i = 0; i < person.followers.length; i++) {
                    if(person.followers[i].publicKey === follower)
                        isExist = true; 
                }
            else isExist = true;
        }
    })
    // console.log(isExist);
    return isExist;
}
export async function addFollowersAccount (
    PublicKey,
    follower
) {
    const isExist = await isFollowerExist(PublicKey, follower.publicKey);
    if(isExist === false)
        await person.findOneAndUpdate(
            {publicKey: PublicKey},
            {
                $push: {
                    followers: follower
                }
            },
            { upsert: true, new: true }
            )
}

/////// -ACCOUNT ///////

async function getBalance(publicKey) {
    let balance = 0;
    await person.findOne({
        publicKey: publicKey
    }, function (err, person) {
        if(person)
            balance = person.balance; 
    })
    // console.log('Balance before: ', balance);
    return balance;
}

export async function payment(publicKey, amount) {
    // connectServer();
    const balance = await getBalance(publicKey);
    // console.log('Old balance', balance);
    const newBalance = balance + amount;
    person.update({ publicKey: publicKey },
        { balance: newBalance }, function (err, person) {
            // console.log('New Balance', newBalance);
            // mongoose.disconnect();
        }
    )
}


////// POST //////
export function updatePosts(publicKey, posts) {

}

export async function getAllPosts(publicKey) {
    // connectServer();
    let posts = [];
    await person.findOne({
        publicKey: publicKey
    }, function(err, person){
        if(err) console.log('ERROR GET ALL POST');
        else {
            if(person)
                posts = person.posts;
        }
    })
    // console.log('Get posts', posts);
    // mongoose.disconnect();
    return posts;
}

export async function getPosts(publicKey, id) {
    // connectServer();
    let post = null;
    await person.findOne({
        publicKey: publicKey
    },function(err, person){
        if(err) console.log('ERROR GET ALL POST');
        else {
            // console.log(person);
            if(person) {
                person.posts.map(p=>{
                    if(p.postId == id)
                        post = p
                })
            }
        }
    })
    // console.log('POST FOUND', post);
    // mongoose.disconnect();
    return post;
}

export function createPost(
    publicKey,
    Title = 'New post for new day',
    Content = 'Unknown content',
    ShareWith = [],
    Image = {},
) {
    // connectServer();
    person.update({
        publicKey: publicKey,
        $push: {
            posts: {
                content: Content,
                title: Title,
                shareWith: ShareWith,
                image: Image
            }
        }
    }, function(err, person){
        if(err) console.log('ERROR CREATE POST', err);
        // else console.log('CREATED POST:', person.posts);
        // mongoose.disconnect();
    })
}

export function interactPost(publicKey, postId, interact) {

}

////// SYSTEM /////
export async function getHeight() {
    let height = -1;
    await system.findOne({
        type: 'height'
    }, function(err, system){
        if(err) console.log('ERROR GET HEIGHT');
        else {
            if(system != null)
                height = system.height
        }
    })
    return height;
} 

export async function updateHeight(Height) {
    await system.updateOne({
        type: 'height'
    },{
        height: Height
    })
}

export async function initSystem() {
    // create user master
    await createAccount('GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7');
    const s = new system({
        type: 'height',
        height: 0
    });
    await s.save();
}