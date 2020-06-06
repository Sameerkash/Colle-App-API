const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// Faculty MongoDB model
const facultySchema = new Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    phone: { type: Number, required: true },
    designation: { type: String, required: true },
    facultyId: { type: String, required: true },
    link: {
        description: String,
        linkedIn: String,
        github: String,
        stackOverflow: String,
    },
    department: { type: String, required: true },
    photoUrl: { type: String, },
    toke: { type: String, }
});

module.exports = mongoose.model('Faculty', facultySchema);