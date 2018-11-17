const server = require('../../server')
const test = require('supertest')
const request = require('request')

test('User registration', (t) => {
    request(server)
        .post('/register', {
            username: 'Teodor',
            email: 'teodorAtaranov@bulgarian.badass',
            password: 'cowboyfromhell',
            confirmpassword: 'cowboyfromhell'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err
            const registeredUser = {
                username: 'Teodor',
                email: 'teodorAtaranov@bulgarian.badass',
                password: 'cowboyfromhell',
                confirmpassword: 'cowboyfromhell'
            }
            t.error()
        })
})
