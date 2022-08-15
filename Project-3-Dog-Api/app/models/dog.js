// DOG -> have an owner, that is a user
// eventually we'll add an array of toy subdocuments

const mongoose = require('mongoose')
// import leash sub document to dog schema
const leashSchema = require('./leash')
// import comment sub document to dog schema
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const dogSchema = new Schema(
    {
        // String type
        dogType: {
            type: String,
            required: true
        },
        // String type
        image: {
			type: String,
			required: true,
		},
        // Number type
        age: {
            type: Number,
            required: true
        },
        // Boolean type
        trainable: {
            type: Boolean,
            required: true
        },

        size: {
            type: String,
            enum: ['small', 'medium', 'big'],
            default: 'medium'
        },
        // leash sub document
        leashes: [leashSchema],
        // comment sub document
        comments: [commentSchema],
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    }, {
        timestamps: true,
        // we're going to be adding virtuals to our model, the following lines will make sure that those virtuals are included whenever we return JSON or an Object
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

// virtuals go here
// these are virtual properties, that use existing data(saved in the database), to add a property whenever we retieve a document and convert it to JSON or an object.
dogSchema.virtual('breedType').get(function () {
    // breedType is going to combine the name and type to build a breedType
    return `${this.image} is a ${this.dogType}`
})

dogSchema.virtual('needASpecialLeash').get(function () {
    if (this.trainable === true) {
        return "you need a special type of leash to be trained"
    } else if (this.trainable === false) {
        return "you dont need a special type of leash, YOU CAN RUN!"
    } 
})

module.exports = model('Dog', dogSchema)