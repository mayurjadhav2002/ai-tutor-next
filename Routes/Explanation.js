const express = require('express');
const explainRoute = express()
const bodyParser = require('body-parser');
const explainController = require('../Controllers/Explaination')

explainRoute.use(bodyParser.json());
explainRoute.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../Middleware/UserAuth')


explainRoute.get('/', (req, res) => {
    res.send("Explanation Routes are Working!")
})
explainRoute.post('/explain',  explainController.UpdateTopic);

module.exports = explainRoute
