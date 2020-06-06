import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

postSchema = new Schema({

    uid: {
        type: _Schema.Types.ObjectId,
        required: true,
        refPath: 'User'
    },
    User: {
        type: String, required: true,
        enum: ['Student', 'Faculty']
    },
    content: {
        type: String, required: true
    },
    image: {
        type: String
    },
    title: {
        type: String, required: true
    },
    created: {
        type: Date, required: true, default: Date.now()
    },
    updatedAt: {
        type: Date, required: true
    }
}
);

export default model('Post', postSchema);