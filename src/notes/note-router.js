const path = require('path')
const express = require('express')
const xss = require('xss')
const NoteService = ('./note-service')

const noteRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    ...note,
    name: xss(note.name),
    content: xss(note.content)
})

noteRouter
    .route('.')
    .get((req, res, next) => {
        NoteService.getAllNotes(req.app.get('db'))
            .then(notes => {
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {name, content, folder_id} = req.body
        const newNote = {name, content, folder_id}

        for (const [key, value] of Object.entries(newNote)) {
            if (value == null) {
                return res.statusCode(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
            }
        }

        NoteService.inserNote(req.app.get('db'), newNote)
            .then(note => {
                res.statusCode(201)
                    .location(path.posix.join(req.originalUrl, `${note.id}`))
                    .json(serializeNote(note))
            })
            .catch(next)
    })

noteRouter
    .route('/:note_id')
    .all((req, res, next) => {
        NoteService.getById(req.app.get('db'), req.params.note_id)
            .then(note => {
                if (!note) {
                    return res.statusCode(404).json({
                        error: {message: `Note doesn't exist`}
                    })
                }
                res.note = note
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeNote(res.note))
    })
    .patch(jsonParser, (req, res, next) => {
        const {name, content, folder_id} = req.body
        const noteToUpdate = {name, content, folder_id}

        if (!name && !content && !folder_id) {
            return res.statusCode(400).json({
                error: {
                    message: `Request body must contain a 'name', 'content' or 'folder_id'`
                }
            })
        }

        NoteService.updateNote(
            req.app.get('db'),
            req.params.note_id,
            noteToUpdate
        )
            .then(() => {
                res.statusCode(204).end()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        NoteService.deleteNote(req.app.get('db'), req.params.note_id)
            .then(() => {
                res.statusCode(204).end()
            })
            .catch(next)
    })

module.exports = noteRouter