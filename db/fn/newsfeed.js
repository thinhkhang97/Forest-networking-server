import person from '../models/person';
import newsfeed from '../models/newfeed';
import {updateSequenceAccount} from './account'
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
    sequence
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
    await updateSequenceAccount(PublicKey,sequence+1);
}

export async function interactPost(publicKey, postId, interact) {

}

export async function getNewFeed(page, perpage) {
    let data = null;
    console.log('In get all new feeds');
    const query = newsfeed.find(
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