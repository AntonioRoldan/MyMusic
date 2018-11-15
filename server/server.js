const express = require('express');
const bodyParser = require('body-parser')
const db = require('./src/db/db')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 4000;

app.post('/register', (req, res) => {  //done 
    const response = db.registerUser(req.body.username,
        req.body.email,
        req.body.password, 
        req.body.confirmpassword)
    if(response == 400) {
        return res.status(response).send('User already exists')
    } 
    if(response == 406) {
        return res.status(response).send('Registration not valid, password or username not long enough or invalid email format')
    }
    if(response == 500) {
        return res.status(response).send('Could not connect to the database')
    }
    return res.send(response)
})

app.post('/postadvert', (req, res) => { //done 
    const newAdvert = db.postAdvert(
        req.body.email,
        req.body.title,
        req.body.description,
        req.body.tradefor,
        req.body.category,
        req.body.postcode,
        req.body.condition,
        req.body.imgurl,
    )
    if(newAdvert == 500) {
        return res.status(500).send('Could not connect to database')

    }
    res.send(newAdvert)
})

app.post('/deleteAdvert', (req, res) => { //done 
    const deletedAdvert = db.deleteAdvert(req.body.advertId)
    if(deletedAdvert == 500){
        return res.status(500).send('Could not connect to database')
    }
    return res.send(deletedAdvert)
})

app.get('/user-id/:posterEmail', (req, res) => { //done 
    db.getPosterId(req.params.posterEmail, (error, posterId) => {
        if(error == 500) return res.status(500).send('Could not connect to the database')
        if(error == 400) return res.status(400).send('Could not find poster')
        return res.send(posterId)
    })
})

app.get('/getAdvert/:advertId', (req, res) => {
    db.getAdvert(req.params.advertId, (error, advert) => {
        if(error == 400) return res.status(error).send('Advert not found')
        if(error == 500) return res.status(error).send('Failed to connect to the database')
        return res.send(advert)
    })
})

app.post('/login', (req, res) => { //done 
    db.loginUser(req.body.email, req.body.password, (error, result) => {
        if(error == 500) return res.status(500).send('Failed to connect to database')
        if(error == 404) return res.status(404).send('Wrong password')
        if(error == 400) return res.status(400).send('User not found')  
        return res.send(result)  
    })
})

app.post('/add-wishlist', (req, res) => {
    db.addToWishlist(req.body.advertId, req.body.userEmail, res)
})

app.post('/check-session', (req, res) => { //done 
    db.checkSession(req.body.session, session => {
        return res.send(session)
    })
})

app.get('/poster/:posterEmail', (req, res) => {
    db.getPoster(req.params.posterEmail, (error, poster) => {
        if(error == 500) return res.status(500).send('Failed to connect to the database')
        if(error == 400) return res.status(400).send('Poster not found')
        return res.send(poster)
    })
})

app.get('/who-am-i', (req, res) => { //done 
    const response = db.whoAmI(req.headers.authorization)
    if(response == 400) return res.status(400).send('Credentials not found')
    return res.send(response)
})

app.post('/logout', (req, res) => { //done 
    const responseMessage = db.logoutUser(req.body.session, res)
    res.send(responseMessage)
})

app.get('/adverts', (req, res) => { //?
    db.getAdverts((err, items) => {
        res.send(items)
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`));


module.exports = app