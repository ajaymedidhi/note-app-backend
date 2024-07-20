// routes/noteRoutes.js
const express = require('express');
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, notesController.createNote);
router.get('/', authMiddleware, notesController.getNotes);
router.get('/deleted', authMiddleware, notesController.getDeletedNotes); // Get deleted notes
router.get('/archived', authMiddleware, notesController.getArchivedNotes); // Get archived notes
router.put('/:id', authMiddleware, notesController.updateNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);
router.delete('/:id/permanent', authMiddleware, notesController.deleteNotePermanently); // Delete note permanently
router.post('/:id/archive', authMiddleware, notesController.archiveNote);
router.post('/:id/unarchive', authMiddleware, notesController.unarchiveNote); // Unarchive note
router.post('/:id/restore', authMiddleware, notesController.restoreNote); // Restore note
router.get('/search', authMiddleware, notesController.searchNotes);
router.get('/label/:label', authMiddleware, notesController.getNotesByLabel);

module.exports = router;
