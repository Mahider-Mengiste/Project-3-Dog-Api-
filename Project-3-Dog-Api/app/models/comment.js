const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: {
            type: String,
            ref: 'User'
        }
    }, {
        timestamps: true
    }
)

module.exports = commentSchema