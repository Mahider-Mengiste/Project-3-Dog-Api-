const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Dog = require('../models/dog')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// POST - /comments/dog_id - create comment
router.post('/comments/:dogId', requireToken, (req, res, next) => {
    // get our comment from req.body
    const comment = req.body.comment
    comment.owner = req.user.id
    comment.email = req.user.email
    // get the dog id from params
    const dogId = req.params.dogId
    // find the dog
    Dog.findById(dogId)
        .then(handle404)
        .then((dog) => {
            console.log('this is the dog', dog)
            console.log('this is the comment', comment)
            // push comment in dog's comment array
            dog.comments.push(comment)
            // save dog
            return dog.save()
        })
        // send the newly updated dog as JSON
        .then(dog => res.status(201).json({ dog: dog }))
        // handle error
        .catch(next)
})

// PATCH - /comments/doDog/comment_id - edit comment, must be owned by signed in user
router.patch('/comments/:dogId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    // get dog and comment ids saved to variables
    const dogId = req.params.dogId
    const commentId = req.params.commentId
    // find the dog
    Dog.findById(dogId)
        .then(handle404)
        .then(dog => {
            // single out the comment
            const theComment = dog.comments.id(commentId)
            // make sure the user sending request is the owner of the comment
            requireOwnership(req, theComment)
            // update comment with subdocument method
            theComment.set(req.body.comment)
            // return saved dog
            return dog.save()
        })
        .then(() => res.sendStatus(204))
        // handle error
        .catch(next)
})

// DELETE - /comments/dog_id/comment_id
router.delete('/comments/:dogId/:commentId', requireToken, (req, res, next) => {
    // save ids to variables
    const dogId = req.params.dogId
    const commentId = req.params.commentId
    // find dog
    Dog.findById(dogId)
    // handle 404
        .then(handle404)
    // delete comment from dog's comment array
        .then(dog => {
            // can get subdoc the same way as update
            const theComment = dog.comments.id(commentId)
            // make sure the user deleting toy is the owner
            requireOwnership(req, theComment)
            // call remove with subdocument method
            theComment.remove()
            // return saved dog
            return dog.save()
        })
        .then(() => res.sendStatus(204))
    // handle errors
        .catch(next)
})

// export router
module.exports = router