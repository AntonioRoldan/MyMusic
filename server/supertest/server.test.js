const server = require('../server')
const test = require('tape')
const request = require('supertest')

const tests = () => {
    test('User registration', t => {
        request(server)
            .post('/register')
            .send({
                username: 'Teodor',
                email: 'teodorAtaranov@bulgarian.badass',
                password: 'cowboyfromhell',
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, result) => {
                if (err) throw err
                const registeredUser = {
                    username: 'Teodor',
                    email: 'teodorAtaranov@bulgarian.badass'
                }
                t.error(err, 'Something')
                t.same(result.body, registeredUser)
                t.end()
            })
    })
}

setTimeout(tests, 200)
setTimeout(() => {
    process.exit(0)
}, 2000)
