// import dependencies
const mongoose = require('mongoose')

// leash will be part of the leashes array added to specific dogs

// we dont, DO NOT, need to get the model from mongoose, so we're going to save a lil real estate in our file and skip destructuring, in favor of the regular syntax
const leashSchema = new mongoose.Schema({
    leashType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
    isChangedFrequently : {
        type: Boolean,
        default: false,
        required: true
    },
    material: {
        type: String,
        // here we're going to use enum, which means we can only use specific strings to satisfy this field.
        // enum is a validator on the type String, that says "you can only use one of these values"
        enum: ['leather', 'nylon', 'chain', 'cottontype'],
        default: 'leather'
    }
}, {
    timestamps: true
})

module.exports = leashSchema