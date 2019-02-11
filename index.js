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

server.post('/api/users', (req, res) => {
    const hobbit = req.body;

    db
        .insert(hobbit)
        .then(hobbit => {
            res.status(201).json({success: true, hobbit});
        })
        .catch( ( { code, message } )  => {
            res.status(code).json({success: false, message})
        })

});



server.listen('4000', () => {
    console.log('Server listening on port 4000')
})