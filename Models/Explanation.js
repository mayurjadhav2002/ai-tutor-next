const mongoose = require('mongoose')
const Explaination = mongoose.Schema({
    RoadmapID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roadmap',
    },
    roadmapTopic: {
        type: String,
        required:true
    },
    TopicId:{
        type:String,
        required: true
    },
    explain: {
        type: String,
        required: true    
    },
    score:{
        type: String,
        required: false
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

module.exports = mongoose.model('Explaination', Explaination);                                                                                                                                                                                                          