import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
    height: Number,
})


export default mongoose.model('system', schema);