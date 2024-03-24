const express = require('express');
const topicRoute = express()
const bodyParser = require('body-parser');
const topic_controller = require('../Controllers/topicController')

topicRoute.use(bodyParser.json());
topicRoute.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../Middleware/UserAuth')


topicRoute.get('/', (req, res) => {
    res.send("Topic Routes are Working!")
})
topicRoute.post('/create',  topic_controller.newTopic);
topicRoute.post('/content', topic_controller.UpdateTopic)
topicRoute.post('/getAll', topic_controller.GetAllTopics)
module.exports = topicRoute
