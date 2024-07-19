// routes/noteRoutes.js
const express = require('express');
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, notesController.createNote);
router.get('/', authMiddleware, notesController.getNotes);
router.put('/:id', authMiddleware, notesController.updateNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);
router.post('/:id/archive', authMiddleware, notesController.archiveNote);
router.get('/search', authMiddleware, notesController.searchNotes);

module.exports = router;
