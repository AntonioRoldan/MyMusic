const {mongoose} = require('./mongoose')
const Advert = require('./models/advert')

const db = mongoose.connection;

db.once('open', function () {
    const ad = new Advert({
        userEmail: 'bob@lmao.com',
        title: 'Washing machine',
        description: 'Fully working washing machine',
        tradefor: ['PS4', 'Laptop'],
        category: 'Home and accessories',
        postcode: 'CV5',
        views: 7,
        condition: 3,
    })
    const adTwo = new Advert({
        userEmail: 'dev@jmsv.me',
        title: 'Bike',
        description: 'Bike in excellent condition',
        tradefor: ['Toaster', 'Laptop'],
        category: 'Bicycles',
        postcode: 'CV1',
        views: 23,
        condition: 4
    })
    ad.save(function (err, newAd) {
        if (err) console.error(err)
        console.log('added', newAd.title)
    });
    adTwo.save(function (err, newAd) {
        console.log('added', newAd.title)
    });
})

