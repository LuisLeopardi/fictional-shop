const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema ({
    model:String,
    price:Number,
    stock:Number,
    description:String,
    image:Buffer,
    is:String,
}
);

const Battery = mongoose.model('Batteries', ItemSchema, 'batteries');
const Phone = mongoose.model('Phones', ItemSchema, 'phones');
const Accessory = mongoose.model('Accesories', ItemSchema, 'accesories');

module.exports = {Battery, Phone, Accessory};