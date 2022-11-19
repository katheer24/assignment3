let mongoose = require('mongoose');
let groceryModel = mongoose.Schema({
    category: String,
    item: String,
    quantity: Number,
    price: Number
},
{
    collections: "items"
}
);

module.exports = mongoose.model('items', groceryModel);