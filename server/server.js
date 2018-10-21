const express = require('express');
const db = require('./src/db/db')

const app = express();

const port = 4000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "*");
    next();
})

app.get('/okay', (req, res) => {
    res.send('Hello world');
})

app.get('/adverts', (req, res) => {
    db.getAdverts((err, items) => {
        res.send(items)
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`));
