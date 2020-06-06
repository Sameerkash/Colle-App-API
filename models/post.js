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
    tit: {
        type: String, required: true
    },
    created: {
        type: Date, required: true
    },
}
);

export default model('Post', postSchema);