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
    const { query } = req.query;

    try {
        const notes = await Note.find({
            user: req.user._id,
            deletedAt: null,
            ...(query ? {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { content: { $regex: query, $options: 'i' } },
                    { tags: { $regex: query, $options: 'i' } }
                ]
            } : {})
        });
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

// Unarchive a note
exports.unarchiveNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        note.archived = false;
        await note.save();
        res.status(200).send('Note unarchived');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get all deleted notes for a user
exports.getDeletedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id, deletedAt: { $ne: null } });
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get all archived notes for a user
exports.getArchivedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id, archived: true });
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a note permanently
exports.deleteNotePermanently = async (req, res) => {
    const { id } = req.params;

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).send('Note permanently deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Restore a note
exports.restoreNote = async (req, res) => {
    const { id } = req.params;

    try {
        await Note.findByIdAndUpdate(id, { deletedAt: null });
        res.status(200).send('Note restored');
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

// Get notes by label
exports.getNotesByLabel = async (req, res) => {
    const { label } = req.params;

    try {
        const notes = await Note.find({ user: req.user._id, tags: label, deletedAt: null });
        res.json(notes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
