const express = require('express');
const bodyParser = require('body-parser')
const db = require('./src/db/db')
const sessions = require('./src/db/sessions')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 4000;

app.get('/okay', (req, res) => {
    res.send('Hello world');
})

app.post('/register', (req, res) => {
    db.registerUser(req.body.username, req.body.email, req.body.password, res)
})

app.post('/login', (req, res) => {
    db.loginUser(req.body.email, req.body.password, res)
})

app.post('/logout', (req, res) => {
    db.logoutUser(req.body.session, res)
})

app.get('/adverts', (req, res) => {
    db.getAdverts((err, items) => {
        res.send(items)
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`));
