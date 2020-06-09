import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

/// Student MongoDB model
const studentSchema = new Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    phone: { type: Number, required: true },
    batch: { type: String, required: true },
    usn: { type: String, required: true },
    link: {
        description: String,
        linkedIn: String,
        github: String,
        stackOverflow: String,
    },
    branch: { type: String, required: true },
});

export default model('Student', studentSchema);