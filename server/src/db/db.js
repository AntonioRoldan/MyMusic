const mongoose = require('./mongoose');
const {ObjectID} = require('mongodb')
const Advert = require('./models/advert')

function getItems(callback) {
    Advert.find({}).then((adverts) => {
        console.log('Adverts: ', adverts);
        callback(null, adverts)
    })
}

module.exports = {getItems};

