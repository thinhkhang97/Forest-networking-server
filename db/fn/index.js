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
/////// ACCOUNT ///////
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

export async function getAccountInfo(publicKey) {
    connectServer();
    let accountInfo = null;
    await person.findOne({
        _id: publicKey
    }, function(err, person){
        accountInfo = person;
    })
    console.log('Account: ', accountInfo);
    mongoose.disconnect();
    return accountInfo;
}

export function updateAccountInfo (
    PublicKey,
    Username = 'Anonymous', 
    Avatar = './db/seed/avatar.png',
    ContentType = 'image/png'
) {
    connectServer(); 
    person.update(
        {_id: PublicKey},
        {
            username: Username,
            avatar: {
                data: fs.readFileSync(Avatar),
                contentType: ContentType
            }
        }, function(err, person) {
            if(err) console.log('ERROR', err);
            else console.log('UPDATED: ', person);
            mongoose.disconnect();
        }
        )
}
/////// -ACCOUNT ///////

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


////// POST //////
export function updatePosts(publicKey, posts) {

}

export async function getAllPosts(publicKey) {
    connectServer();
    let posts = [];
    await person.findOne({
        _id: publicKey
    }, function(err, person){
        if(err) console.log('ERROR GET ALL POST');
        else posts = person.posts;
    })
    console.log('Get posts', posts);
    mongoose.disconnect();
    return posts;
}

export async function getPosts(publicKey, id) {
    connectServer();
    let post = null;
    await person.findOne({
        _id: publicKey
    },function(err, person){
        if(err) console.log('ERROR GET ALL POST');
        else {
            console.log(person);
            person.posts.map(p=>{
                if(p._id == id)
                    post = p
            })
        }
    })
    console.log('POST FOUND', post);
    mongoose.disconnect();
    return post;
}

export function createPost(
    publicKey,
    Title = 'New post for new day',
    Content = 'Unknown content',
    ShareWith = [],
    Image = {},
) {
    connectServer();
    person.update({
        _id: publicKey,
        $push: {
            posts: {
                title: Title,
                content: Content,
                shareWith: ShareWith,
                image: Image
            }
        }
    }, function(err, person){
        if(err) console.log('ERROR CREATE POST', err);
        else console.log('CREATED POST:', person.posts);
        mongoose.disconnect();
    })
}

export function interactPost(publicKey, postId, interact) {

}