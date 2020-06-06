const mongoose = require('mongoose');
const Schema = mongoose.Schema;

postSchema = new Schema({

    uid: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Post', postSchema);