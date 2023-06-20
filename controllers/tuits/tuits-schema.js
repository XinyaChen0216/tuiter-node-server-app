import mongoose from 'mongoose';
const schema = mongoose.Schema({
    tuit: String,
    likes: Number,
    liked: Boolean,

    topic: String,
    userName: String,
    time: String,
    image: String,
    replies: Number,
    retuits: Number,
    handle: String,
    dislikes: Number,
    disliked: Boolean
}, { collection: 'tuits' });
export default schema;
