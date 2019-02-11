// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({success: true, users})
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: "The users information could not be retrieved."
            })
        })
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    db
        .findById(userId)
        .then(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    user
                })
            }
            res.status(404).json({ success: false, message: "The user with the specified ID does not exist."})
        })
        .catch(() => {
            res.status(500).json({ success: false, error: "The user information could not be retrieved."})
        })
});

server.post('/api/users', (req, res) => {
    const hobbit = req.body;
    const { name, bio } = req.body;
    if (!name|| !bio) {
        return res.status(400).json({success: false, message: "Please provide name and bio for the user."})
    }
    db
        .insert(hobbit)
        .then(hobbit => {

            res.status(201).json({success: true, hobbit});
        })
        .catch( ( { code, message } )  => {
            res.status(code).json({success: false, error: "There was an error while saving the user to the database"})
        })

});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id

    db
        .remove(userId)
        .then(deleted => {
            if(deleted) {
                res.status(204).json({success: true, message: `The user at id ${userId} was deleted`}).end();
            }
            res.status(404).json({ success: false, message: "The user with the specified ID does not exist."})
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The user could not be removed"})
        })
});

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const updatedUser = req.body

    if(!updatedUser.name || !updatedUser.bio) {
        return res.status(400).json({success: false, message: "Please provide name and bio for the user."})
    }
    db
        .update(userId, updatedUser)
        .then(updated => {
            if(updated) {
                res.status(200).json({ success: true, updated})
            }
            res.status(404).json({ success: false, message: "No"})
        })
        .catch(() => {
            res.status(500).json({ error: "The user information could not be modified." } )
        })
});
server.listen('4000', () => {
    console.log('Server listening on port 4000')
})