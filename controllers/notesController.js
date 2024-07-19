// controllers/notesController.js
const Note = require('../models/note');

// Create a new note
exports.createNote = async (req, res) => {
    const { title, content, tags, color, reminder } = req.body;
    const note = new Note({
        title,
        content,
        tags,
        color,
        reminder,
        user: req.user._id // Attach the user ID from the authenticated request
    });

    try {
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get all notes for a user
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id, deletedAt: null });
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags, color, reminder } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content, tags, color, reminder }, { new: true });
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        await Note.findByIdAndUpdate(id, { deletedAt: new Date() });
        res.status(200).send('Note moved to trash');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Archive a note
exports.archiveNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        note.archived = !note.archived;
        await note.save();
        res.status(200).send('Note archived status toggled');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Search notes
exports.searchNotes = async (req, res) => {
    const { query } = req.query;

    try {
        const notes = await Note.find({
            user: req.user._id,
            deletedAt: null,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
