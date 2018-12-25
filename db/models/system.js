import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
    type: String,
    height: Number,
})


export default mongoose.model('system', schema);