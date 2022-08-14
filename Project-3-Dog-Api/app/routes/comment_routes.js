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

// POST -> create a comment
// POST /dogs/<comment_id>
router.post('/dogs/:commentId', removeBlanks, (req, res, next) => {
    // get our dog's id from req.params.dogId
    const dogId = req.params.dogId
    // obtain userId from the request and store it inside author object
    req.body.author = req.body.userId
    // find the dog
    Dog.findById(dogId)
        .then(handle404)
        .then(dog => {
            console.log('this is the dog', dog)
            // push the comment into the dog's comments array
            dog.comments.push(req.body)
            // save the dog
            return dog.save()
            
        })
        // send the newly updated dog as json
        .then(dog => res.status(201).json({ dog: dog }))
        .catch(next)
})

// DELETE a comment 
// DELETE /dogss/<dog_id>/<comment_id>
router.delete('/dogs/:dogId/:commentId', requireToken, (req, res, next) => {
    // obtain dog Id from the request
    const dogId = req.params.dogId
    // obtain user Id from the request and store it inside commentId variable
    const commentId = req.params.commentId
    // then we find the dog
    Dog.findById(dogId)
        // handle a 404
        .then(handle404)
        // do stuff with the comment(in this case, delete it)
        .then(dog => {
            // pass comment id to dog and store it in comment
            const comment = dog.comments.id(commentId)
            // require that the user deleting this dog is the dog's owner
            requireOwnership(req, comment)
            // call remove on the subdoc
            commentId.removecomment
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