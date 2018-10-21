const mongoose = require('./mongoose');
const Advert = require('./models/advert')

function getAdverts(callback) {
    Advert.find({}).then((adverts) => {
        adverts.sort((a, b) => a.views > b.views)
        callback(null, adverts)
    })
}

module.exports = {getAdverts};

