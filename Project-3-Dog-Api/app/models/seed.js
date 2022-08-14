// seed.js is going to be the file we run, whenever we want to seed our database, we'll create a bunch of dogs at once.

// we want to be careful with this, because when we run it, it'll delete all of the dogs in the db. 

// we can modify this later, to only delete dogs that don't have an owner already, but we'll keep it simple for ndog

const mongoose = require('mongoose')
const Dog = require('./dog')
const db = require('../../config/db')

const startDogs = [
    {
        dogType: 'Bulldog',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Whitebulldog.jpg',
        age: 12,
        trainable: true,
        size: "medium"
    },

    {
        dogType: 'Airedale Terrier',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Airedale_Terrier.jpg',
        age: 12,
        trainable: true,
        size: "small"
    },

    {
        name: 'German Shepherd',
        image: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
        age: 12,
        trainable: true,
        size: "big"
    },

    {
        name: 'Afghan Hound',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Arabian_Hound_001_U.jpg/1200px-Arabian_Hound_001_U.jpg',
        age: 12,
        trainable: false,
        size: "medium"
    },

    {
        name: 'samoyed',
        image: 'https://www.akc.org/wp-content/uploads/2017/11/Samoyed-standing-in-the-forest.jpg',
        age: 12,
        trainable: false,
        size: "medium"
    },
    
    {
        name: 'american eskimo dog',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/American_Eskimo_Dog_1.jpg',
        age: 12,
        trainable: false,
        size: "small"
    },
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // remove all of the dogs
        // delete dog without an owner
        Dog.deleteMany({ owner: null })
            .then(deletedDogs => {
                console.log('deletedDogs', deletedDogs)
                // the next step is to use our startDogs array to create our seeded Dogs
                Dog.create(startDogs)
                    .then(newDogs => {
                        console.log('the new dogs', newDogs)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })