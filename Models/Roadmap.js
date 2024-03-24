const mongoose = require('mongoose')
const Roadmap = mongoose.Schema({
    topicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    },
    subject: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    roadmap:{
        type: Object,
        required: true
    },
    roadmapDesc:{
        type: String,
        required: false
    },
    nicheSubject: {
        type:String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Roadmap', Roadmap);