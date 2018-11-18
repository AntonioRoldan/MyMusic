const db = require('../src/db/db')


describe('getAdverts', () => {
    test('Extracting adverts', done => {
        expect.assertions(3)
        db.getAdverts((_, items) => {
            expect(Array.isArray(items)).toBeTruthy()
            expect(items.length).toBe(4)
            expect(items[0].title).toBe('Macbook')
            done()
        })
    })
})


setTimeout(() => process.exit(0), 3000)

