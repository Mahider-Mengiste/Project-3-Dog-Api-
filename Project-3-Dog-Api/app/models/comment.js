const mongoose = require('./connectdb')

const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, {
    timestamps: true
})

module.exports = commentSchema