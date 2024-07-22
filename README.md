# Notes App Backend

This is the backend for a Notes App, built with Node.js and Express, with MongoDB as the database. The application allows users to create, update, delete, and manage their notes, including archiving, restoring, and searching notes.

## Features

- User authentication (register and login)
- Create, update, delete, and manage notes
- Archive and restore notes
- Permanent deletion of notes
- Tag notes with labels
- Search notes by title, content, or tags
- Get notes by label
- Get all archived and deleted notes

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/notes-app-backend.git
    cd notes-app-backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```
    MONGODB_URI=mongodb://localhost:27017/note-taking-app
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the server:

    ```sh
    npm start
    ```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

### Notes

- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes for the authenticated user
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Move a note to trash
- `DELETE /api/notes/:id/permanent` - Permanently delete a note
- `POST /api/notes/:id/archive` - Archive a note
- `POST /api/notes/:id/unarchive` - Unarchive a note
- `POST /api/notes/:id/restore` - Restore a note from trash
- `GET /api/notes/deleted` - Get all deleted notes for the authenticated user
- `GET /api/notes/archived` - Get all archived notes for the authenticated user
- `GET /api/notes/search` - Search notes by query
- `GET /api/notes/label/:label` - Get notes by label

## Project Structure

src/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── app.js
│
└── .env



### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

## Controllers

### Notes Controller

- `createNote` - Create a new note
- `getNotes` - Get all notes for a user
- `updateNote` - Update a note
- `deleteNote` - Move a note to trash
- `archiveNote` - Archive a note
- `searchNotes` - Search notes by query
- `getDeletedNotes` - Get all deleted notes for a user
- `getArchivedNotes` - Get all archived notes for a user
- `deleteNotePermanently` - Permanently delete a note
- `restoreNote` - Restore a note from trash
- `unarchiveNote` - Unarchive a note

### User Controller

- `registerUser` - Register a new user
- `loginUser` - Login a user

## License

This project is licensed under the MIT License.

