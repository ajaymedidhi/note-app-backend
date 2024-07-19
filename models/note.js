// models/note.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    color: { type: String, default: 'white' },
    reminder: { type: Date },
    archived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Note', noteSchema);
