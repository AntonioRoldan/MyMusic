const mongoose = require('mongoose');

let items = [
  {
    title: "fender strat",
    description: "cool guitar",
    seller: "john smith",
    category: "musical instruments",
    price: 440.99
  }
];

function getItems() {
  return items;
}

function searchItem(text) {
  return items.find(item => item.title.includes(text))
}

module.exports = { getItems, searchItem };
