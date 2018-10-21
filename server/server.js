const express = require('express');
const db = require('./src/db/db')

const app = express();

const port = 4000;

app.get('/okay', (req, res) => {
    res.send('Hello world');
})

app.get('/items', (req, res) => {
    db.getItems((err, items) => {
        res.send(items)
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`));
