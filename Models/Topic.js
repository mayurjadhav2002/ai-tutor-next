const mongoose = require('mongoose')
const Topic = mongoose.Schema({
    subject:{
        type:String,
        required: true
    },
    nicheSubject: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true});

module.exports = mongoose.model('Topic', Topic);