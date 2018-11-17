const server = require('../server')
const test = require('tape')
const request = require('supertest')

test('User registration', (t) => {
    request(server)
        .post('/register', {
            username: 'Teodor',
            email: 'teodorAtaranov@bulgarian.badass',
            password: 'cowboyfromhell',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err
            const registeredUser = {
                username: 'Teodor',
                email: 'teodorAtaranov@bulgarian.badass'
            }
            t.error(err, 'Something')
            t.same(res.body, registeredUser)
            t.end()
        })
})
