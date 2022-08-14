const express = require('express')
const passport = require('passport')

// pull in Mongoose model for dogs
const Dog = require('../models/dog')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ROUTES GO HERE
// we only need three, and we want to set them up using the same conventions as our other routes, which means we might need to refer to those other files to make sure we're using our middleware correctly

// POST -> create a leash
// POST /leashs/<dog_id>
router.post('/leashs/:dogId', removeBlanks, (req, res, next) => {
    // get our leash from req.body
    const leash = req.body.leash
    // get our dog's id from req.params.dogId
    const dogId = req.params.dogId
    // find the dog
    Dog.findById(dogId)
        .then(handle404)
        .then(dog => {
            console.log('this is the dog', dog)
            console.log('this is the leash', leash)

            // push the leash into the dog's leashs array
            dog.leashs.push(leash)

            // save the dog
            return dog.save()
            
        })
        // send the newly updated dog as json
        .then(dog => res.status(201).json({ dog: dog }))
        .catch(next)
})

// UPDATE a leash
// PATCH /leashs/<dog_id>/<leash_id>
router.patch('/leashs/:dogId/:leashId', requireToken, removeBlanks, (req, res, next) => {
    // get the leash and the dog ids saved to variables
    const dogId = req.params.dogId
    const leashId = req.params.leashId

    // find our dog
    Dog.findById(dogId)
        .then(handle404)
        .then(dog => {
            // single out the leash (.id is a subdoc method to find something in an array of subdocs)
            const theLeash = dog.leashs.id(leashId)
            // make sure the user sending the request is the owner
            requireOwnership(req, dog)
            // update the leash with a subdocument method
            theLeash.set(req.body.leash)
            // return the saved dog
            return dog.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a leash
// DELETE /leashs/<dog_id>/<leash_id>
router.delete('/leashs/:dogId/:leashId', requireToken, (req, res, next) => {
    // get the leash and the dog ids saved to variables
    const dogId = req.params.dogId
    const leashId = req.params.leashId
    // then we find the dog
    Dog.findById(dogId)
        // handle a 404
        .then(handle404)
        // do stuff with the leash(in this case, delete it)
        .then(dog => {
            // we can get the subdoc the same way as update
            const theLeash = dog.leashs.id(leashId)
            // require that the user deleting this leash is the dog's owner
            requireOwnership(req, dog)
            // call remove on the subdoc
            theLeash.removedog
            // return the saved dog
            return dog.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

// export the router
module.exports = router