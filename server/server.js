const express = require('express');
const bodyParser = require('body-parser')
const db = require('./src/db/db')
const sessions = require('./src/db/sessions')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 4000;

app.post('/register', (req, res) => {
    db.registerUser(req.body.username, req.body.email, req.body.password, req.body.confirmpassword, res)
})

app.post('/postadvert', (req, res) => {
    db.postAdvert(
        req.body.email,
        req.body.title,
        req.body.description,
        req.body.tradefor,
        req.body.category,
        req.body.postcode,
        req.body.condition,
        res
    )
})

app.post('/login', (req, res) => {
    db.loginUser(req.body.email, req.body.password, res)
})

app.post('/check-session', (req, res) => {
    db.checkSession(req.body.session, res)
})

app.get('/who-am-i', (req, res) => {
    db.whoAmI(req.headers.authorization, res)
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
