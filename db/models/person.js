import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    // User name to show on the networking
    username: {
        type: String,
        required: true,
    },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    // Public key of user
    publicKey: {
        type: String,
        required: true,
    },
    // The balance of user
    balance: {
        type: Number,
        required: true,
    },
    // Posts of the user
    posts: [{
            postId: String,
            content: String,
            title: String,
            time: Date,
            image: {
                data: Buffer,
                contentType: String,
            },
            comment: [{
                    publicKey: String, // Public key of user comment
                    cmtcontent: String
                }],
            // All the people that user want to share this post
            shareWith: [{
                    publicKey: String,
                }],
            // All interactive that the post has
            like: [{
                publicKey: String,
            }],
            angry: [{
                publicKey: String,
            }],
            love: [{
                publicKey: String,
            }],
            sad: [{
                publicKey: String,
            }],
            haha: [{
                publicKey: String,
            }],
            wow: [{
                publicKey: String,
            }],
        }],
    following: [{
        publicKey: String,
    }],
    followers: [{
        publicKey: String,
    }]
})

export default mongoose.model('person', schema);