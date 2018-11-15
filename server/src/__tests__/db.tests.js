const server = require('../../server')
const test = require('supertest')
const tape = require('tape')

test('User registration', function(t) {
    request(server)
        .post('/register', {
            username:'Teodor',
                email: 'teodorAtaranov@bulgarian.badass',
                password:'cowboyfromhell',
                confirmpassword:'cowboyfromhell'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            const registeredUser = {
                username:'Teodor',
                email: 'teodorAtaranov@bulgarian.badass',
                password:'cowboyfromhell',
                confirmpassword:'cowboyfromhell'
            }
            t.error()
        })
})