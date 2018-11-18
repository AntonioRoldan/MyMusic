const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/db/db')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 4000

app.post('/register', (req, res) => {
    console.log(req.body)
    db.registerUser(req.body.username, req.body.email, req.body.password, (error, result) => {
        if(error) return res.status(error).send(result)
        return res.send(result)
    })
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
        req.body.imgurl,
        (error, result) => {
            if(error) return res.status(error).send(result)
            return res.send(result)
        }
    )
})

app.post('/deleteAdvert', (req, res) => { //done
    db.deleteAdvert(req.body.advertId, (error, deletedAdvert) => {
        if(error) return res.status(error).send('Could not connect to database')
        return res.send(deletedAdvert)
    })
})

app.get('/user-id/:posterEmail', (req, res) => { //done
    db.getPosterId(req.params.posterEmail, (error, posterId) => {
        if(error === 500) return res.status(500).send('Could not connect to the database')
        if(error === 400) return res.status(400).send('Could not find poster')
        return res.send(posterId)
    })
})

app.get('/getAdvert/:advertId', (req, res) => {
    db.getAdvert(req.params.advertId, (error, advert) => {
        if(error === 400) return res.status(error).send('Advert not found')
        if(error === 500) return res.status(error).send('Failed to connect to the database')
        return res.send(advert)
    })
})

app.post('/login', (req, res) => { //done
    db.loginUser(req.body.email, req.body.password, (error, result) => {
        if(error) return res.status(error).send(result)
        return res.send(result)
    })
})

app.post('/add-wishlist', (req, res) => {
    db.addToWishlist(req.body.advertId, req.body.userEmail, (error, result) => {
        if(error) return res.status(error).send(result)
        return res.send(result)
    })
})

app.post('/check-session', (req, res) => { //done
    db.checkSession(req.body.session, session => {
        return res.send(session)
    })
})

app.get('/poster/:posterEmail', (req, res) => {
    db.getPoster(req.params.posterEmail, (error, poster) => {
        if(error === 500) return res.status(500).send('Failed to connect to the database')
        if(error === 400) return res.status(400).send('Poster not found')
        return res.send(poster)
    })
})

app.get('/who-am-i', (req, res) => { //done
    db.whoAmI(req.headers.authorization, (result) => {
        if(result === 404) return res.status(result).send('Credentials not found')
        return res.send(result)
    })
})

app.post('/logout', (req, res) => { //done
    db.logoutUser(req.body.session, (error, result) => {
        if(error) return res.status(404).send(result)
        return res.send(result)
    })
})

app.get('/adverts', (_, res) => {
    db.getAdverts((err, items) => {
        if (err) return res.status(500).send(err)
        res.send(items)
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`))


module.exports = app
